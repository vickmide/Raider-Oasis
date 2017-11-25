var ProceduralGeneration = ProceduralGeneration || {};

//Constructor DungeonState
ProceduralGeneration.DungeonState = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre

    this.LEVEL_FILE = "assets/levels/room_level.json";
};

//Subclase extiende de superclase
ProceduralGeneration.DungeonState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a DungeonState el constructor correspondiente
ProceduralGeneration.DungeonState.prototype.constructor = ProceduralGeneration.DungeonState;

//Override init de la superclase
//number_of_rooms se recibe de main.js 
ProceduralGeneration.DungeonState.prototype.init = function (number_of_rooms, score, life) {
    "use strict";
    this.number_of_rooms = number_of_rooms;
    this.dungeon = this.dungeon || new ProceduralGeneration.Dungeon(this);
    this.score = score || 0;
    this.life = life || 0;
};

//Override de preload de la superclase
ProceduralGeneration.DungeonState.prototype.preload = function () {
    "use strict";
    //Se carga el archivo JSON para llenar la sala
    this.load.text("population", "assets/levels/population.json");
};

//Override de create de la superclase
ProceduralGeneration.DungeonState.prototype.create = function () {
    "use strict";
    var initial_room;
    //Genera una nueva mazmorra
    initial_room = this.dungeon.generate_dungeon(10);
       
    //Inicializa RoomState desde la sala incial
    /*
    Realmente inicia BootState, que se encarga de inicializar parametros relacionados
    con la lectura de JSON, pero se envia "RoomState" en el contexto de este
    estado para poder acceder a los datos generados en el (como la mazmorra)
    */
    this.game.state.start("BootState", true, false, this.LEVEL_FILE, "RoomState", {
        room: initial_room
    }, this.score, this.life);
};