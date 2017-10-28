var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

ProceduralGeneration.BootState.prototype = Object.create(Phaser.State.prototype);
ProceduralGeneration.BootState.prototype.constructor = ProceduralGeneration.BootState;

ProceduralGeneration.BootState.prototype.init = function (level_file, next_state, extra_parameters) {
    "use strict";
    this.level_file = level_file; //Donde se encuentra el archivo JSON
    this.next_state = next_state;
    this.extra_parameters = extra_parameters;
};

ProceduralGeneration.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);  //el identificador del archivo JSON y donde se aloja.
    // Esta instrucción carga el texto del JSON
};


/*Accedemos al texto del archivo JSON con el identificaddor level1
En level_text almacenamos el texto JSON accediendo a la caché de Phaser (?) con el identificador level1
En level_data ...
Al final llamamos al estado LoadingState con el método game.state.start y le mandamos la key del siguiente estado, 
limpia el mundo (?), no limpiamos la caché y le mandamos los parámetros que nos interesen
*/
ProceduralGeneration.BootState.prototype.create = function () { 
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1"); 
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data, this.next_state, this.extra_parameters);
};