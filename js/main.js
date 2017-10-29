//Crea objeto proceduralgeneration 
//para generación de mazmorras aleatorias
var ProceduralGeneration = ProceduralGeneration || {};

//Crea el objeto juego
var game = new Phaser.Game(600, 600, Phaser.CANVAS, "canvas-juego");

//Añade estados al juego
game.state.add("BootState", new ProceduralGeneration.BootState());
game.state.add("LoadingState", new ProceduralGeneration.LoadingState());
game.state.add("DungeonState", new ProceduralGeneration.DungeonState());
game.state.add("RoomState", new ProceduralGeneration.RoomState());

//Inicializa el estado start
//Parametro extra enviado a init de DungeonState
game.state.start("DungeonState", true, false, 10);