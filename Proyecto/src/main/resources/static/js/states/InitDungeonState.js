var ProceduralGeneration = ProceduralGeneration || {};

//Constructor DungeonState
ProceduralGeneration.InitDungeonState = function () {
    Phaser.State.call(this); //llamada al constructor padre

    

    //VARIABLES GLOBALES
    rnform = [];
    //variables de dungeon

    //vecinos XX (lista)
    //variables de room
    rntile = []; //numero de tiles XX (entero)
    rnsize = {}; //espacio del tile XX (conjunto de cinco valores)
    rntilecenter = []; //posicion del tile XX (punto)
    rnprefab = [] //numero de prefabs XX (cero y uno)
    
    //variable auxiliar
    i = 0;
    j = 0;
};

//Subclase extiende de superclase
ProceduralGeneration.InitDungeonState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a DungeonState el constructor correspondiente
ProceduralGeneration.InitDungeonState.prototype.constructor = ProceduralGeneration.InitDungeonState;

//Override init de la superclase
//number_of_rooms se recibe de main.js 
ProceduralGeneration.InitDungeonState.prototype.init = function (sala) {
    this.sala = sala;
    rnform = this.sala.rnform;
    rntile = this.sala.rntile;
    rnsize = this.sala.rnsize;
    rntilecenter = this.sala.rntilecenter;

    rnprefab = this.sala.rnprefab;
};

//Override de create de la superclase
ProceduralGeneration.InitDungeonState.prototype.create = function () {
    "use strict";
    //Paso al siguiente estado
    
    this.game.state.start("DungeonState", true, false, 10, 0, 500);
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }