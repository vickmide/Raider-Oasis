//Constructor WinState
LobbyState = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre
};


//Subclase extiende de superclase
LobbyState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a WinState el constructor correspondiente
LobbyState.prototype.constructor = ProceduralGeneration.LobbyState;

//Override init de la superclase
LobbyState.prototype.init = function () {
    "use strict";
};


//Override de create de la superclase
LobbyState.prototype.create = function () {
    "use strict";
    game.state.start("InitDungeonState", true, false)
    console.log("ey");
};