var ProceduralGeneration = ProceduralGeneration || {};

//Constructor de LoadingState
ProceduralGeneration.LoadingState = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor de superclase
};

//Subclase extiende de superclase
ProceduralGeneration.LoadingState.prototype = Object.create(Phaser.State.prototype);
//Asigna a LoadingState un constructor determinado
ProceduralGeneration.LoadingState.prototype.constructor = ProceduralGeneration.LoadingState;

//Override del metodo Init de la superclase
ProceduralGeneration.LoadingState.prototype.init = function (level_data, next_state, extra_parameters, score, life) {
    "use strict";
    this.level_data = level_data; //Datos JSON
    this.next_state = next_state; //Contexto para RoomState
    this.extra_parameters = extra_parameters; //Resto de parametros: sala inicial
    this.score = score || 0;
    this.life = life || 0;
};

//Override del metodo preload de la superclase
ProceduralGeneration.LoadingState.prototype.preload = function () {
    "use strict";
    var assets; //almacena todos los assets del JSON
    var asset_key; //identificador para cada asset
    var asset; //variable auxiliar para recorrer assets

    assets = this.level_data.assets; //asocia a los datos del JSON
    for (asset_key in assets) { // Carga cada asset segun su key correspondiente
        if (assets.hasOwnProperty(asset_key)) { //Cuando el asset tenga la propiedad indicada
            asset = assets[asset_key]; //Se almacena el asset en la variable auxiliar asset
            switch (asset.type) { //Segun el tipo de assets que pueda existir
                case "image": //Caso imagen
                    this.load.image(asset_key, asset.source); //carga la imagen mandandole el identificador y su ubicación
                    break;
                case "spritesheet": //Caso spritesheet: se carga con su ubicación,
                    //el ancho, el alto, los frames, el margen y el espacio
                    this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                    break;
                case "tilemap": //Caso tilemap se carga con el identificador, su ubicación
                    this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                    break;
            }
        }
    }
    //carga las vidas
    this.load.image("fullLife", "/assets/images/life5.png");
    this.load.image("fourLife", "/assets/images/life4.png");
    this.load.image("threeLife", "/assets/images/life3.png");
    this.load.image("twoLife", "/assets/images/life2.png");
    this.load.image("oneLife", "/assets/images/life1.png");
    this.load.image("dead", "/assets/images/dead.png");
};

//Override de metodo create de superclase
ProceduralGeneration.LoadingState.prototype.create = function () {
    "use strict";
    //Se transita al siguiente estado (roomstate)
    //Se envia junto a los datos JSON y los parametros extra: sala inicial
    this.game.state.start(this.next_state, true, false, this.level_data, this.extra_parameters, this.score, this.life);
};