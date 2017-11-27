var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.Room = function (game_state, coordinate, tile_dimensions) {
    "use strict";
    this.game_state = game_state; //estado del juego correspondiente a cada sala
    this.coordinate = coordinate; // coordenadas de la sala
    this.tile_dimensions = tile_dimensions; //dimensiones del tile

    this.population = []; //lista vacia para poblar
    this.neighbors = {}; //objecto vacio para almacenar vecinos
    this.tiles = []; //lista vacia para almacenar tiles
    this.prefabs = []; //lista para almacenar prefabs
};

//Devuelve las coordenadas de las salas vecinas a una sala
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

//Conecta las salas
ProceduralGeneration.Room.prototype.connect = function (direction, room) {
    "use strict";
    this.neighbors[direction] = room;
};


ProceduralGeneration.Room.prototype.template_name = function () {
    "use strict";
    var template_name;
    //template_name seguido de las direcciones de los vecinos
    template_name = "room_";
    this.neighbor_coordinates().forEach(function (coordinate) {
        if (this.neighbors[coordinate.direction]) {
            template_name += coordinate.direction;
        }
    }, this);
    template_name += ".json";
    return template_name;
};

   

//Pobla la sala
ProceduralGeneration.Room.prototype.populate = function (population) {
    "use strict";
    var number_of_rows, number_of_columns, row_index, column_index, 
    tile_type, number_of_tiles, prefab_type, number_of_prefabs;
    
    //Numero de columnas y filas
    number_of_rows = this.game_state.game.world.height / this.tile_dimensions.y;
    number_of_columns = this.game_state.game.world.width / this.tile_dimensions.x;
    //Inicializa el objeto de poblamiennto como vacio
    for (row_index = 0; row_index <= number_of_rows; row_index += 1) {
        this.population.push([]);
        for (column_index = 0; column_index <= number_of_columns; column_index += 1) {
            this.population[row_index][column_index] = null;
        }
    }

    //Pobla la sala con tiles
    for (tile_type in population.tiles) {
        if (population.tiles.hasOwnProperty(tile_type)) {
            // pick a random number of tiles
            number_of_tiles = rntile.shift();
            // create the tiles
            this.populate_tiles(number_of_tiles, population.tiles[tile_type].layer, population.tiles[tile_type].possible_tiles, population.tiles[tile_type].sizes);
        }
    }
   
    // populate the room with prefabs
    for (prefab_type in population.prefabs) {
        if (population.prefabs.hasOwnProperty(prefab_type)) {
            //Escoge un numero aleatorio de prefabs
            number_of_prefabs = rnprefab[j];
            j = j + 1;
            //Crea los prefabs
            this.populate_prefabs(number_of_prefabs, population.prefabs[prefab_type].possible_prefabs);
        }
    }
};

//Pobla los tiles
ProceduralGeneration.Room.prototype.populate_tiles = function (number_of_tiles, layer, possible_tiles, possible_sizes) {
    "use strict";
    var index, tile, region_size, region, coordinate_index;
    for (index = 0; index < number_of_tiles; index += 1) {
        //Escoge un indice aleatorio en el tile
        tile = this.game_state.game.rnd.pick(possible_tiles);
        //Escoge un tamaño aleatorio
        region_size = rnsize;
        //Busca una seccion libre con el tamaño indicado
        region = this.find_free_region(region_size);
        //Añade la region a las propiedades del tiled
        for (coordinate_index = 0; coordinate_index < region.length; coordinate_index += 1) {
            this.tiles.push({
                layer: layer,
                tile: tile,
                position: region[coordinate_index]
            });
            this.population[region[coordinate_index].y][region[coordinate_index].x] = tile;
        }
    }
};

//Genera el prefab aleatorio
ProceduralGeneration.Room.prototype.populate_prefabs = function (number_of_prefabs, possible_prefabs_data) {
    "use strict";
    var index, prefab_data, prefab, tile_position, position, properties;
    for (index = 0; index < number_of_prefabs; index += 1) {
        //Escoge un prefab aleatorio
        prefab_data = this.game_state.game.rnd.pick(possible_prefabs_data);
        prefab = prefab_data.prefab;
        //Busca un espacio libre para prefab
        tile_position = this.find_free_region({
            x: 1,
            y: 1
        });
        position = new Phaser.Point((tile_position[0].x * this.tile_dimensions.x) + (this.tile_dimensions.x / 2),
            (tile_position[0].y * this.tile_dimensions.y) + (this.tile_dimensions.y / 2));
        properties = prefab_data.properties;

        //Añade el prebab a la lista de prefabs
        this.prefabs.push({
            name: prefab + index,
            prefab: prefab,
            position: position,
            properties: properties
        });
        this.population[tile_position[0].y][tile_position[0].x] = prefab;
    }
};

//Busca una region libre en la sala
ProceduralGeneration.Room.prototype.find_free_region = function (size_in_tiles) {
    "use strict";
    var center_tile, region, x_coordinate, y_coordinate, initial_x_coordinate, initial_y_coordinate;
   
    do {
        //Calcula el centro de la sala en filas y columnas !! no es el centro de la sala, es el centro del obstáculo
        center_tile = new Phaser.Point(rntilecenter[i], rntilecenter[i+1]);
        if(i>95){
            i=0;
        }
        i = i + 2;
        region = [center_tile];
        initial_x_coordinate = center_tile.x - Math.floor(size_in_tiles.x / 2);
        initial_y_coordinate = center_tile.y - Math.floor(size_in_tiles.y / 2);
        //Añade todas las coordenadas de la sala basada en el tamaño
        for (x_coordinate = initial_x_coordinate; x_coordinate < initial_x_coordinate + size_in_tiles.x; x_coordinate += 1) {
            for (y_coordinate = initial_y_coordinate; y_coordinate < initial_y_coordinate + size_in_tiles.y; y_coordinate += 1) {
                region.push(new Phaser.Point(x_coordinate, y_coordinate));
            }
        }
    } while (!this.is_free(region)); //Mientras no haya regiones libres
    return region;
};

//Comprueba si una region está libre
ProceduralGeneration.Room.prototype.is_free = function (region) {
    "use strict";
    var coordinate_index, coordinate;
    for (coordinate_index = 0; coordinate_index < region.length; coordinate_index += 1) {
        coordinate = region[coordinate_index];
        //Comprueba si hay algun objeto en esta coordenada
        if (this.population[coordinate.y][coordinate.x]) {
            return false;
        }
    }
    return true;
};