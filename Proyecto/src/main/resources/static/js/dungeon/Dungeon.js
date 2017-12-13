var ProceduralGeneration = ProceduralGeneration || {};

//En este .js se genera la mazmorra (salas aleatorias)

//Constructor para Dungeon
ProceduralGeneration.Dungeon = function (game_state) {
    "use strict";
    this.TILE_DIMENSIONS = new Phaser.Point(64, 64);

    this.game_state = game_state;
};

//Genara mazmorra 
ProceduralGeneration.Dungeon.prototype.generate_dungeon = function (number_of_rooms) {
    "use strict";
    //tamaño del grid, salas a crear, coordenadas de la sala actual, sala actual, salas creadas, coordenadas de la sala inicial, distancia maxima a la sala inicial, distancia a la sala inicial
    var grid_size, rooms_to_creates, current_room_coordinate, current_room, created_rooms, initial_room_coordinate, final_room_coordinate, max_distance_to_initial_room, distance_to_initial_room, population;
    //inicializa el grid
    grid_size = 2 * number_of_rooms;
    this.initialize_grid(grid_size);

    //Situa la coordenada inicial en medio del Grid
    initial_room_coordinate = new Phaser.Point((grid_size / 2) - 1, (grid_size / 2) - 1);
    final_room_coordinate = new Phaser.Point(initial_room_coordinate.x, initial_room_coordinate.y);
    rooms_to_creates = []; //lista vacia que contendra las salas a crear
    
    //Introducimos la sala inicial en las salas a crear
    rooms_to_creates.push({
        row: initial_room_coordinate.y,
        column: initial_room_coordinate.x
    });
    created_rooms = []; //lista vacia que contendra las salas ya creadas
    
    //Itera para cada sala creada
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

    //Carga los datos de poblamiento del archivo JSON
    population = JSON.parse(this.game_state.game.cache.getText("population"));

    max_distance_to_initial_room = 0;
    //Itera sobre cada sala para poblarla de elementos y conectarla
    created_rooms.forEach(function (room) {
        room.neighbor_coordinates().forEach(function (coordinate) { //obtiene sus coordenadas vecinas
            if (this.grid[coordinate.row][coordinate.column]) { //conecta la sala con las salas vecinas
                room.connect(coordinate.direction, this.grid[coordinate.row][coordinate.column]);
            }
        }, this);
        //Pobla la sala
        room.populate(population);

        //Comprueba la distancia con la sala inicial
        distance_to_initial_room = Math.abs(room.coordinate.column - initial_room_coordinate.x) + Math.abs(room.coordinate.row - initial_room_coordinate.y);
        //Comprueba que no se sale del grid
        if (distance_to_initial_room > max_distance_to_initial_room) {
            final_room_coordinate.x = room.coordinate.column;
            final_room_coordinate.y = room.coordinate.row;
        }
    }, this);

    //A partir del metodo populate_prefabs añade una coordenada para añadir la salida de la sala
    this.grid[final_room_coordinate.y][final_room_coordinate.x].populate_prefabs(1, [{
        prefab: "exit",
        properties: {
            texture: "exit_image",
            group: "exits"
        }
    }]);
    //Devuelve el grid con las salas interconectadas, comenzando en la sala inicial
    //this.print_grid();

    return this.grid[initial_room_coordinate.y][initial_room_coordinate.x];
};

//Inicializa la grid (array bidimensional) a partir de un tamaño dado
ProceduralGeneration.Dungeon.prototype.initialize_grid = function (grid_size) {
    "use strict";
    var row_index, column_index;
    this.grid = [];
    //Todos los elementos del grid (salas) iniciados a null
    for (row_index = 0; row_index < grid_size; row_index += 1) {
        this.grid.push([]);
        for (column_index = 0; column_index < grid_size; column_index += 1) {
            this.grid[row_index].push(null);
        }
    }
};

//Comprueba los vecinos adyadcentes a la sala actual (parametros: habitacion actual, habitaciones a crear)
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
    //Selecciona un numero aleatorio de vecinos
    number_of_neighbors = 1;
    //this.game_state.game.rnd.between(1, available_neighbors.length - 1);
    
    //Selecciona las coordenadas del vecino
    for (neighbor_index = 0; neighbor_index < number_of_neighbors; neighbor_index += 1) {
        random_number = rnform.shift();
        room_frac = 1 / available_neighbors.length;
        //Asigna un rango para cada vecino y seleciona uno disponible
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

// ProceduralGeneration.Dungeon.prototype.print_grid = function () {
//     "use strict";
//     var row_index, column_index, row;

//     for (row_index = 0; row_index < this.grid.length; row_index += 1) {
//         row = "";
//         for (column_index = 0; column_index < this.grid[row_index].length; column_index += 1) {
//             if (this.grid[row_index][column_index]) {
//                 row += "R";
//             } else {
//                 row += "X";
//             }
//         }
//         console.log(row);
//     }
// };