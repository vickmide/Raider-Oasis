var ProceduralGeneration = ProceduralGeneration || {};

//Constructor BootState
ProceduralGeneration.BootState = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor de la superclase
};

//Subclase extiende de superclase
ProceduralGeneration.BootState.prototype = Object.create(Phaser.State.prototype);
//Se asigna a BootState un constructor determinado
ProceduralGeneration.BootState.prototype.constructor = ProceduralGeneration.BootState;

//Override de init de la superclase
ProceduralGeneration.BootState.prototype.init = function (level_file, next_state, extra_parameters, score, life, direction) {
    "use strict";
    this.level_file = level_file; //Ruta del JSON
    //console.log(this.level_file);
    this.next_state = next_state; //Contexto de RoomState
    this.extra_parameters = extra_parameters; //Sala inicial
    this.score = score || 0;
    this.life = life || 0;
    last_door = direction;
};

ProceduralGeneration.BootState.prototype.preload = function () {
    "use strict";
    //Identificador para el archivo JSON
    //Incluye también su rota de alojamiento
    this.load.text("level1", this.level_file);
};

/*
Se accede al texto del archivo JSON con el identificaddor level1
En level_text se almacena el texto JSON accediendo 
a los datos caché de Phaser con el identificador level1 En level_data.
Finalmente se llama al estado LoadingState con el método game.state.start 
y se le envia la key del siguiente estado, limpia el mundo, no limpiamos la caché y 
le mandamos los parámetros que nos interesen
*/

//Override del metodo create de la superclase
ProceduralGeneration.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);     
    //traduce el archivo JSON
    //Invoca al siguiente estado LoadingState
    //Envia: level_data: JSON traducido, next_state: contexto para RoomState, extra_parameters: sala inicial
    this.game.state.start("LoadingState", true, false, level_data, this.next_state, this.extra_parameters, this.score, this.life);
};
