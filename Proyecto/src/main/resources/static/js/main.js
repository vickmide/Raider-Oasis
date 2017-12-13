//Crea objeto proceduralgeneration 
//para generación de mazmorras aleatorias
var ProceduralGeneration = ProceduralGeneration || {};

//Crea el objeto juego
var game = new Phaser.Game(704, 704, Phaser.CANVAS, "canvas-juego");

score = 0;
life = 500;
last_door = 0;
hero_id = -1;
lobbyactual = -1;
//primeraroom = true;
salahero = {
        x: 0,
        y: 0
    };
salaother = {
        x: 0,
        y: 0
    };
otherheropos = {
		x: 0,
		y: 0,
		xscale: 1
};
mismasala = true;

//VARIABLES CLIENTE-SERVIDOR
numJugadores = 0;

var Sala0 = {Id: 0, isEmpty: true, numJugadores: 0, button:"", textButton: "Nº de Jugadores: "+0+"/2"};
var Sala1 = {Id: 1, isEmpty: true, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+0+"/2"};
var Sala2 = {Id: 2, isEmpty: true, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+0+"/2"};
var Sala3 = {Id: 3, isEmpty: true, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+0+"/2"};

var lobby = [Sala0, Sala1, Sala2, Sala3];

$(document).ready(function () {
	connection = new WebSocket('ws://127.0.0.1:8181/game');
    connection.onerror = function (e) {
        console.log("WS error: " + e);
    }
    numSalas = 0;
    WSResponse_salaCreada = false;
    WSResponse_unionSala = false;
    WSResponse_doorMsg = false;
    WSResponse_positionMsg = false
    WSResponse_spawnMsg = false
    WSResponse_endMsg = false

    connection.onmessage = function(msg) {
        console.log("WS message: " + msg.data);
        misdatos = JSON.parse(msg.data);
        switch(misdatos.protocolo){
        
        case "createSala_msg":
        	numSalas = misdatos.id + 1;
            numJugadores = misdatos.numJugadores;
            WSResponse_salaCreada = true;
        	break;
      
        case "joinSala_msg":
        	
        	WSResponse_unionSala = true;
        	break;
        case "door_msg":
        	salaother = {
                x: misdatos.newroomX,
                y: misdatos.newroomY
            };
        	WSResponse_doorMsg = true;
        	break;
        case "position_msg":
        	otherheropos = {
                x: misdatos.otherposX,
                y: misdatos.otherposY,
                xscale: misdatos.otherScale
            };
        	WSResponse_positionMsg = true;
        	break;
        case "spawnentity_msg":
        	WSResponse_spawnMsg = true;
        	break;
        case "endgame_msg":
        	WSResponse_endMsg = true;
        	break;
        
        }  
       }
});


//var isEmpty = [false, false, false, false];
//Añade estados al juego
game.state.add("SearchingLobby", new SearchingLobby());
game.state.add("LobbyState", new LobbyState());
game.state.add("InitDungeonState", new ProceduralGeneration.InitDungeonState());
game.state.add("BootState", new ProceduralGeneration.BootState());
game.state.add("LoadingState", new ProceduralGeneration.LoadingState());
game.state.add("DungeonState", new ProceduralGeneration.DungeonState());
game.state.add("RoomState", new ProceduralGeneration.RoomState());
game.state.add("WinState", new WinState());
game.state.add("GameOverState", new GameOverState());

//Inicializa el estado start
//Parametro extra enviado a init de DungeonState
//game.state.start("DungeonState", true, false, 10, score, life);
game.state.start("SearchingLobby", true, false);


