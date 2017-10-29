var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

ProceduralGeneration.LoadingState.prototype = Object.create(Phaser.State.prototype);
ProceduralGeneration.LoadingState.prototype.constructor = ProceduralGeneration.LoadingState;

ProceduralGeneration.LoadingState.prototype.init = function (level_data, next_state, extra_parameters) {
    "use strict";
    this.level_data = level_data; //Archivo JSON aquí
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;
};

ProceduralGeneration.LoadingState.prototype.preload = function () {
    "use strict";
    var assets //almacena todos los assets del JSON
    var asset_key //el identificador de cada asset
    var asset; //variable auxiliar

    assets = this.level_data.assets; 
    for (asset_key in assets) { // 
        if (assets.hasOwnProperty(asset_key)) {//si el asset tiene la propiedad indicada... (es decir, si tiene identificador)
            asset = assets[asset_key]; //almaceno dicho asset en la variable auxiliar asset
            switch (asset.type) { //esto para los distintos tipos de assets que puedan surgir, si creamos más, los añadimos aquí
            case "image": //si es una imagen...
                this.load.image(asset_key, asset.source); //carga la imagen mandandole el identificador y su ubicación
                break;
            case "spritesheet": //si es una spritesheet lo carga mandandole el identificador, su ubicación,
                                //el ancho, el alto, los frames, el margen y el espacio
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap": //...y el tilemap manda el identificador, su ubicación
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }
};


/*Vamos al siguiente estado*/
ProceduralGeneration.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start(this.next_state, true, false, this.level_data, this.extra_parameters);
};