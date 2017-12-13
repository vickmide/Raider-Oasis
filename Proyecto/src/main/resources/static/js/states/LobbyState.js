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


LobbyState.prototype.init = function (sala) {
    //this.numLobbies = numLobbies;
    this.sala = sala;
};

LobbyState.prototype.preload = function () {    
    game.load.image('wallpaper', 'img/EsperandoJugadores.png');
};

LobbyState.prototype.create = function () {  

	datadungeon = "";
    function nextState() {
        $.ajax({
            method: "POST",
            url: 'http://localhost:8181/dungeon',
            data: JSON.stringify({}),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
            mensaje = {"protocolo":"createSala_msg", "id":numSalas};
            connection.send(JSON.stringify(mensaje));
            console.log(numJugadores);            
            game.add.sprite(0, 0, 'wallpaper');
            datadungeon = data;   
        });
    }
    
    
    nextState();  
    
};

LobbyState.prototype.update = function () {  
	if (WSResponse_unionSala){
		WSResponse_unionSala = false;
		game.state.start("InitDungeonState", true, false, datadungeon);
	}
};
