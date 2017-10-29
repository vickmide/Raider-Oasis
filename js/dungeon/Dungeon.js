var ProceduralGeneration = ProceduralGeneration || {};

/*Este .js generará la disposición de salas aleatorias*/

ProceduralGeneration.Dungeon = function (game_state) {
    "use strict";
    this.TILE_DIMENSIONS = new Phaser.Point(32, 32);
    this.game_state = game_state;
};

//Genera salas aleatorias
ProceduralGeneration.Dungeon.prototype.generate_dungeon = function (number_of_rooms) { 
    "use strict";
    //tamaño del grid              coordenadas de la sala actual            salas creadas                        coordenadas de la sala final                              distancia a la sala inicial
    var grid_size, rooms_to_creates, current_room_coordinate, current_room, created_rooms, initial_room_coordinate, final_room_coordinate, max_distance_to_initial_room, distance_to_initial_room;
    //             salas a crear                              sala actual               coordenadas de la sala incial                     distancia máxima a la sala inicial                                             
    
    
    //Inicializa grid 
    grid_size = 2 * number_of_rooms;
    this.initialize_grid(grid_size);

    //Situa la coordenada inicial en medio del Grid
    initial_room_coordinate = new Phaser.Point((grid_size / 2) - 1, (grid_size / 2) - 1); 
    rooms_to_creates = []; //lista vacia que contendra las salas a crear
    //Introducimos la sala inicial en las salas a crear
    rooms_to_creates.push({row: initial_room_coordinate.y, column: initial_room_coordinate.x}); 
    created_rooms = []; //lista vacia que contendra las salas ya creadas
  
    //Iteracion de creacion de salas

    //Si hay salas por crear y las salas creadas no superan el numero total de salas
    while (rooms_to_creates.length > 0 && created_rooms.length < number_of_rooms) {
         //Guarda la primera posicion de la lista rooms_to_creates en current_room_cordinate
         //(y elimina dicho elemento de su lista original (metodo .shift()))
        current_room_coordinate = rooms_to_creates.shift();
       
        //Se crea la sala enviandole el estado de juego, las coordenadas actuales de la sala
        //y el tamaño del tile
        current_room = new ProceduralGeneration.Room(this.game_state, current_room_coordinate, this.TILE_DIMENSIONS); 
        
        this.grid[current_room_coordinate.row][current_room_coordinate.column] = current_room;
        created_rooms.push(current_room);
        // Añade un numero aleatorios de vecinos a rooms_to_creates
        this.check_for_neighbors(current_room, rooms_to_creates);
    }

    // Conecta las salas 
    created_rooms.forEach(function (room) {
        room.neighbor_coordinates().forEach(function (coordinate) {
            if (this.grid[coordinate.row][coordinate.column]) {
                room.connect(coordinate.direction, this.grid[coordinate.row][coordinate.column]);
            }
        }, this);
    }, this);

    return this.grid[initial_room_coordinate.y][initial_room_coordinate.x];
};

ProceduralGeneration.Dungeon.prototype.print_grid = function () {
    "use strict";
    var row_index, column_index, row;
    for (row_index = 0; row_index < this.grid.length; row_index += 1) {
        row = "";
        for (column_index = 0; column_index < this.grid[row_index].length; column_index += 1) {
            if (this.grid[row_index][column_index]) {
                row += "R";
            } else {
                row += "X";
            }
        }
        console.log(row);
    }
};

//Inicializa Grid (crea array bidimensional lleno de nulos)
ProceduralGeneration.Dungeon.prototype.initialize_grid = function (grid_size) {
    "use strict";
    var row_index, column_index;
    this.grid = [];
    // Llena el array de nulos
    for (row_index = 0; row_index < grid_size; row_index += 1) {
        this.grid.push([]);
        for (column_index = 0; column_index < grid_size; column_index += 1) {
            this.grid[row_index].push(null);
        }
    }
};

ProceduralGeneration.Dungeon.prototype.check_for_neighbors = function (room, rooms_to_creates) {
    "use strict";
    var coordinates_to_check, available_neighbors, number_of_neighbors, neighbor_index, random_number, room_frac, available_neighbor_index;
    coordinates_to_check = room.neighbor_coordinates();
    available_neighbors = [];
    //Encuentra las coordenadas libres para insertar salas
    //Si una coordenada vecina almacena nulo se añade a posibles coordanadas
    coordinates_to_check.forEach(function (coordinate) {
        if (!this.grid[coordinate.row][coordinate.column]) {
            available_neighbors.push(coordinate);
        }
    }, this);
    
    // Selecciona una coordenada aleatoria de los vecinos disponibles
    number_of_neighbors = this.game_state.game.rnd.between(1, available_neighbors.length - 1);

    // Selecciona las coordenadas vecinas
    for (neighbor_index = 0; neighbor_index < number_of_neighbors; neighbor_index += 1) {
        random_number = this.game_state.game.rnd.frac();
        room_frac = 1 / available_neighbors.length;

        for (available_neighbor_index = 0; available_neighbor_index < available_neighbors.length; available_neighbor_index += 1) {
            if (random_number < room_frac) {
                rooms_to_creates.push(available_neighbors[available_neighbor_index]);
                available_neighbors.splice(available_neighbor_index, 1);
                break;
            } else {
                room_frac += (1 / available_neighbors.length);
            }
        }
    }
};
