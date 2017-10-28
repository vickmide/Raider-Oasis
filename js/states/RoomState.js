var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.RoomState = function () {
    "use strict";
    Phaser.State.call(this);
    

    //keys o identificadores para usar cuando creemos el mapa y el tileset
    this.MAP_KEY = "room_tilemap";
    this.MAP_TILESET = "dungeon_tileset";
    
    //identificadores para inicializar los prefabs
    this.prefab_classes = { 
        "hero": ProceduralGeneration.Hero.prototype.constructor,
        "door": ProceduralGeneration.Door.prototype.constructor
    };
};

ProceduralGeneration.RoomState.prototype = Object.create(Phaser.State.prototype);
ProceduralGeneration.RoomState.prototype.constructor = ProceduralGeneration.RoomState;


//En el método init inicializa la física del juego y la escala
ProceduralGeneration.RoomState.prototype.init = function (level_data, extra_parameters) {
    "use strict";
    var tileset_index, tile_dimensions;
    this.level_data = this.level_data || level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //configura la escala del canvas
    this.scale.pageAlignHorizontally = true; //alinea horizontalmente con el padre contenedor o ventana
    this.scale.pageAlignVertically = true; //alinea verticalmente con el padre contenedor o ventana
    
    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE); //sigue la física tipo ARCADE
    this.game.physics.arcade.gravity.y = 0; //gravedad en y = 0
    
    // get current room
    this.room = extra_parameters.room;
};

ProceduralGeneration.RoomState.prototype.preload = function () { //carga un mapa según el nombre de la sala
    "use strict";
    this.load.tilemap(this.MAP_KEY, "assets/maps/" + this.room.template_name(), null, Phaser.Tilemap.TILED_JSON);
};

ProceduralGeneration.RoomState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;
    // Crea el mapa
    this.map = this.game.add.tilemap(this.MAP_KEY); //crea el tilemap, que son los índices que indican cada tile a usar
    
    this.map.addTilesetImage(//añade una imagen al mapa para ser usada como tileset
                            this.map.tilesets[0].name,  //nombre del tileset como se especifica en los datos del mapa
                            this.MAP_TILESET);          //key
                          
    // create map layers (AQUÍ PASAN COSAS MUY RARAS)
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            collision_tiles = [];
            layer.data.forEach(function (data_row) { // find tiles used in the layer
                data_row.forEach(function (tile) {
                    // check if it's a valid tile index and isn't already in the list
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);
    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();
    
    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    
    // create objects (prefabs)
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
};

ProceduralGeneration.RoomState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position, prefab;
    // tiled coordinates starts in the bottom left corner
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object_y};
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};
