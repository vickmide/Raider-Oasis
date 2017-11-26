//Constructor WinState
LobbyState = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre
};
salaN = {};  

//Subclase extiende de superclase
LobbyState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a WinState el constructor correspondiente
LobbyState.prototype.constructor = ProceduralGeneration.LobbyState;
//Override init de la superclase
LobbyState.prototype.init = function (numLobbies, sala) {

    //this.numLobbies = numLobbies;
    this.sala = sala;
     
};

//Override de create de la superclase
LobbyState.prototype.create = function () {    
        createItem();    
};

function createItem() {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8181/dungeon',
        data: JSON.stringify({}),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        //console.log("Sala creada: " + JSON.stringify(data));
        game.state.start("InitDungeonState", true, false, data);
    });
}
