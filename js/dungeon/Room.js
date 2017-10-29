var ProceduralGeneration = ProceduralGeneration || {};

//Constructor Room
ProceduralGeneration.Room = function (game_state, coordinate, tile_dimensions) {
    "use strict";
    this.game_state = game_state; //estado del juego correspondiente a cada sala
    this.coordinate = coordinate; // coordenadas de la sala
    this.tile_dimensions = tile_dimensions; //dimensiones del tile
    this.neighbors = {}; //salas vecinas
};

//Devuelve las salas vecinas
ProceduralGeneration.Room.prototype.neighbor_coordinates = function () { 
    "use strict";
    var neighbor_coordinates;
    neighbor_coordinates = [
        {direction: "N", row: this.coordinate.row - 1, column: this.coordinate.column},
        {direction: "E", row: this.coordinate.row, column: this.coordinate.column + 1},
        {direction: "S", row: this.coordinate.row + 1, column: this.coordinate.column},
        {direction: "W", row: this.coordinate.row, column: this.coordinate.column - 1}
    ];
    return neighbor_coordinates;
};

ProceduralGeneration.Room.prototype.connect = function (direction, room) { //conecta las salas (?)
    "use strict";
    this.neighbors[direction] = room;
};

ProceduralGeneration.Room.prototype.template_name = function () {
    "use strict";
    var template_name;
    // template_name seguido de las direcciones de los vecinos
    template_name = "room_";
    this.neighbor_coordinates().forEach(function (coordinate) {
        if (this.neighbors[coordinate.direction]) {
            template_name += coordinate.direction;
        }
    }, this);
    template_name += ".json";
    return template_name;
};


