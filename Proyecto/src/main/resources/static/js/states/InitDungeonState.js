var ProceduralGeneration = ProceduralGeneration || {};

//Constructor DungeonState
ProceduralGeneration.InitDungeonState = function () {
    Phaser.State.call(this); //llamada al constructor padre

    rnform = [];

    //VARIABLES GLOBALES
    //variables de dungeon
    for (i = 0; i < 10; i++){
        rnform.push(getRandom(0,1));
    }
        console.log(rnform);
    //[0.5, 0.5, 0.4, 0.5, 0.9, 0.4, 0.6, 0.75, 0.4, 0.25];
    
    //vecinos XX (lista)
    //variables de room
    rntile = [5,4,8,3,2,7,6,8,9,2]; //numero de tiles XX (entero)
    rnsize = {x:1, y:1}; //espacio del tile XX (conjunto de cinco valores)
    rntilecenter = [5, 5, 6, 7, 5, 7, 5, 5, 7, 8, 4, 5, 4, 6, 7, 4, 4, 8, 5, 6, 5,7, 5, 7, 5, 5, 7, 8, 5, 5, 5, 7, 5, 5, 6, 5, 7, 8, 4, 5, 4, 6, 7, 4, 4, 8]; //posicion del tile XX (punto)
    rnprefab = [1, 0, 0, 1,
                0, 0, 0, 1,
                0, 0, 0, 0,
                0, 0, 1, 1,
                1, 0, 0, 1,
                1, 0, 0, 1,
                1, 0, 0, 1,
                1, 0, 0, 1,
                1, 0, 0, 1,
                1, 0, 0, 1]; //numero de prefabs XX (cero y uno)
    
};

//Subclase extiende de superclase
ProceduralGeneration.InitDungeonState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a DungeonState el constructor correspondiente
ProceduralGeneration.InitDungeonState.prototype.constructor = ProceduralGeneration.InitDungeonState;

//Override init de la superclase
//number_of_rooms se recibe de main.js 
ProceduralGeneration.InitDungeonState.prototype.init = function () {
    "use strict";

};

//Override de create de la superclase
ProceduralGeneration.InitDungeonState.prototype.create = function () {
    "use strict";
    
    console.log("me estoy ejecutandoooo loco");

    //Paso al siguiente estado
    this.game.state.start("DungeonState", true, false, 10, 0, 500);
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }