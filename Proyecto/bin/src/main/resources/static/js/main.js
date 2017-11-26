//Crea objeto proceduralgeneration 
//para generación de mazmorras aleatorias
var ProceduralGeneration = ProceduralGeneration || {};

//Crea el objeto juego
var game = new Phaser.Game(704, 704, Phaser.CANVAS, "canvas-juego");

score = 0;
life = 500;
numLobbies = 3;
var isEmpty = [false, false, false, false];
//Añade estados al juego
game.state.add("SearchingLobby", new SearchingLobby());
game.state.add("LobbyState", new LobbyState());
game.state.add("BootState", new ProceduralGeneration.BootState());
game.state.add("LoadingState", new ProceduralGeneration.LoadingState());
game.state.add("DungeonState", new ProceduralGeneration.DungeonState());
game.state.add("RoomState", new ProceduralGeneration.RoomState());
game.state.add("WinState", new WinState());
game.state.add("GameOverState", new GameOverState());

//Inicializa el estado start
//Parametro extra enviado a init de DungeonState
//game.state.start("DungeonState", true, false, 10, score, life);
game.state.start("SearchingLobby", true, false, numLobbies, isEmpty);
