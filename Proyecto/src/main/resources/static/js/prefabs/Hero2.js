var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.Hero2 = function (game_state, name, position, properties) {
    ProceduralGeneration.Prefab.call(this, game_state, name, position, properties);
    
    var tile_size = 64; // Tamaño del tile
    var offset_x = 30; // Offset X del sprite dado su anchor
    var offset_y = 15; // Offset Y del sprite dado su anchor
    
    // Coloca al jugador en el sitio correcto y mirando al lado correspondiente a la ultima puerta por la que entró
    if (last_door == "S") {
        this.x = (6 * tile_size) - offset_x;
        this.y = (3 * tile_size) - offset_y;
    } else if (last_door == "N") {
        this.x = (6 * tile_size) - offset_x;
        this.y = (8 * tile_size) + offset_y*4;
    } else if (last_door == "W") {
        this.x = (8 * tile_size) + offset_x;
        this.y = (6 * tile_size) - offset_y + 5;
    } else if (last_door == "E") {
        this.x = (3 * tile_size) - offset_x;
        this.y = (6 * tile_size) - offset_y + 10;
    }

    // El anchor del sprite es necesario que esté a los pies del personaje, para que no se "suba por encima" de los obstáculos al chocarse desde arriba
    this.anchor.setTo(0.5, 1); // x = mitad del sprite, y = abajo del todo del sprite
    
    this.walking_speed = +properties.walking_speed;

    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    
    // Cambiamos el tamaño del body (físico, no del sprite) para que las colisiones sean mas ajustadas
    this.body.width = 25;
    this.body.height = 25;
    
    this.animations.add("walking", [1, 2, 3, 4], 6, true);
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    globalhero2 = this;
};

ProceduralGeneration.Hero2.prototype = Object.create(ProceduralGeneration.Prefab.prototype);
ProceduralGeneration.Hero2.prototype.constructor = ProceduralGeneration.Hero2;

ProceduralGeneration.Hero2.prototype.update = function () {
     
     this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

};
