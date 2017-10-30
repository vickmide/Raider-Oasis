var ProceduralGeneration = ProceduralGeneration || {};

//Constructor RoomState
ProceduralGeneration.RoomState = function () {
    "use strict";
    Phaser.State.call(this); //Llamada al constructor padre

    //Keys para la creación de tilset y tilemap
    this.MAP_KEY = "room_tilemap";
    this.MAP_TILESET = "dungeon_tileset";

    //Identificadores para inicializar los prefabs
    //Como todos heredan de prefab, se llama a su constructor usando las propiedades del polimorfismo
    this.prefab_classes = {
        "hero": ProceduralGeneration.Hero.prototype.constructor,
        "door": ProceduralGeneration.Door.prototype.constructor,
        "enemy": ProceduralGeneration.Enemy.prototype.constructor,
        "trienemy": ProceduralGeneration.Trienemy.prototype.constructor,
        "squarenemy": ProceduralGeneration.Squarenemy.prototype.constructor,
        "exit": ProceduralGeneration.Exit.prototype.constructor,
        "treasure": ProceduralGeneration.Treasure.prototype.constructor,
    };
};

//Subclase extiende de superclase
ProceduralGeneration.RoomState.prototype = Object.create(Phaser.State.prototype);
//Asigna a RoomState un constructor determinado
ProceduralGeneration.RoomState.prototype.constructor = ProceduralGeneration.RoomState;

//Override del metodo init de superclase
ProceduralGeneration.RoomState.prototype.init = function (level_data, extra_parameters, score, life) {
    var tileset_index, tile_dimensions;
    //Si existen ya datos de nivel, no se cargan de nuevo.
    this.level_data = this.level_data || level_data;

    //Escala el canvas y lo posiciona en pantalla
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //Configuración del renderizado de imagenes para que no se difuminen
    game.renderer.renderSession.roundPixels = true;  
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    //Configura fisicas
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    //Obtiene la sala inicial
    this.room = extra_parameters.room;

    this.score = score || 0;
    this.life = life || 0;
};

//Carga un mapa según el nombre de la sala
ProceduralGeneration.RoomState.prototype.preload = function () {
    "use strict";
    this.load.tilemap(this.MAP_KEY, "assets/maps/" + this.room.template_name(), null, Phaser.Tilemap.TILED_JSON);
};

//Override del metodo create de la superclase
//Visualiza el mapa, crea grupos, añade prefabs
ProceduralGeneration.RoomState.prototype.create = function () {

    var group_name, object_layer, collision_tiles, new_prefab;

    //Crea el tilemap, son los índices que indican cada tile a usar
    this.map = this.game.add.tilemap(this.MAP_KEY);
    //añade una imagen al mapa para ser usada como tileset
    //recibe nombre del tileset como se especifica en los datos del mapa y key
    this.map.addTilesetImage(this.map.tilesets[0].name, this.MAP_TILESET);

    //Crea mapa de layers
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { //Layer de colision (tiene colision)
            this.map.setCollisionByExclusion([-1], true, layer.name);
        }
    }, this);

    //Crea grupos para cada tipo de objeto
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);

    this.prefabs = {};

    //Crea los prefabs para cada grupo
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            //Crea el layer para los objetos
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }

    //Añade los tiles a la sala
    this.room.tiles.forEach(function (tile) {
        this.map.putTile(tile.tile, tile.position.x, tile.position.y, tile.layer);
    }, this);

    this.room.prefabs.forEach(function (prefab) {
        new_prefab = new this.prefab_classes[prefab.prefab](this, prefab.name, prefab.position, prefab.properties);
    }, this);

    //Añade texto con score
    scoreText = game.add.text(480, 10, 'score: ' + this.score, { fontSize: '20px', fill: '#000' });
    //Añade texto con life
   
};

//Crea los diferentes objetos en la escena (doors, enemies, players...)k
ProceduralGeneration.RoomState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position, prefab;
    //las coordenadas del tiled comienzan en el la esquina inferior izquierda
    //posicion y del objeto
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    //posicion final del objeto
    position = {
        "x": object.x + (this.map.tileHeight / 2),
        "y": object_y
    };
    //Crea un objeto en concordancia a su tipo
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
    //lo añade a la lista de prefabs (se aplica polimorfismo)
    this.prefabs[object.name] = prefab;
};