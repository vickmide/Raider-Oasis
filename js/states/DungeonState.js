var ProceduralGeneration = ProceduralGeneration || {};

//Constructor DungeonState
ProceduralGeneration.DungeonState = function () {
    "use strict";
    Phaser.State.call(this); //llama al constructor de la superclase

    this.LEVEL_FILE = "assets/levels/room_level.json";  //Ubicación del JSON
};

//Subclase extiende de superclase
ProceduralGeneration.DungeonState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a DungeonState el constructor correspondiente
ProceduralGeneration.DungeonState.prototype.constructor = ProceduralGeneration.DungeonState;

//Override init de la superclase 
//number_of rooms viene dada por constructur de state.star en main.js
ProceduralGeneration.DungeonState.prototype.init = function (number_of_rooms) {
    "use strict";
    this.number_of_rooms = number_of_rooms; //numero de salas que se van a crear
    this.dungeon = this.dungeon || new ProceduralGeneration.Dungeon(this); //Inicializa la mazmorra
};

//Override create de la superclase
ProceduralGeneration.DungeonState.prototype.create = function () {
    "use strict";
    var initial_room; //sala inicial

    // Genera nueva mazmorra con todas las salas generadas y conectadas
    // Devuelve la posición inicial donde empieza la mazmorrra y almacena en initial_room
    initial_room = this.dungeon.generate_dungeon(this.number_of_rooms);
    //this.dungeon.print_grid();

    
    this.game.state.start("BootState", true, false, this.LEVEL_FILE, "RoomState", {room: initial_room});
};
