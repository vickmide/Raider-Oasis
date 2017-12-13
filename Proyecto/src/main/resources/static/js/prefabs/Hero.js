var ProceduralGeneration = ProceduralGeneration || {};


ProceduralGeneration.Hero = function (game_state, name, position, properties) {
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
        this.y = (8 * tile_size) + offset_y * 4;
    } else if (last_door == "W") {
        this.x = (8 * tile_size) + offset_x;
        this.y = (6 * tile_size) - offset_y + 5;
    } else if (last_door == "E") {
        this.x = (3 * tile_size) - offset_x;
        this.y = (6 * tile_size) - offset_y + 10;
    }
    
    // Asi no se repiten mil veces los console logs de prueba de si estan en la misma sala o no
    this.consolelog1existe = false;
    this.consolelog2existe = false;

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
    globalhero = this;
    xhero = this.game_state.room.coordinate.row;
    yhero = this.game_state.room.coordinate.column;
    salahero = {
            //id: hero_id,
            x: xhero,
            y: yhero
        };
    
    lastpos = {
    	x: 0,
    	y: 0
    };
    mensaje = {"protocolo":"door_msg","roomX":xhero,"roomY":yhero};
	connection.send(JSON.stringify(mensaje));
};

ProceduralGeneration.Hero.prototype = Object.create(ProceduralGeneration.Prefab.prototype);
ProceduralGeneration.Hero.prototype.constructor = ProceduralGeneration.Hero;

ProceduralGeneration.Hero.prototype.update = function () {
	if (WSResponse_doorMsg) {
        console.log("Alguien ha pasado por una puerta!");
        WSResponse_doorMsg = false;
    }
	
	if ((salahero.x == salaother.x)&&(salahero.y == salaother.y)) {
		
    	if (!this.consolelog1existe) console.log("Estais en la misma sala!");
    	this.consolelog1existe = true;
    	this.consolelog2existe = false;
    	if (lastpos.x != this.x || lastpos.y != this.y) {
	    	mensaje = {"protocolo":"position_msg","thisposX":this.x,"thisposY":this.y,"thisScale":this.scale.x};
	    	lastpos.x = this.x;
	    	lastpos.y = this.y;
	    	connection.send(JSON.stringify(mensaje));
    	}
    	mismasala = true;
    } else {
    	if (!this.consolelog2existe) console.log("No estais en la misma sala");
    	this.consolelog1existe = false;
    	this.consolelog2existe = true;
    	mismasala = false;
    }
	
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    if (this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.enemies, null, null, this) ||
        this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.trienemies, null, null, this) ||
        this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.squarenemies, null, null, this)) {
        life = life - 1;


        if (life <= 0) {
            game.state.start("GameOverState", true, false, score);
        }
    }
    if (WSResponse_endMsg) {
    	game.state.start("GameOverState", true, false, score);
    	WSResponse_endMsg = false;
    }
    if (life >= 500) {
        player = game.add.sprite(20, 20, 'fullLife');
    } else if (life > 400) {
        player = game.add.sprite(20, 20, 'fourLife');
    } else if (life > 300) {
        player = game.add.sprite(20, 20, 'threeLife');
    } else if (life > 200) {
        player = game.add.sprite(20, 20, 'twoLife');
    } else if (life > 100) {
        player = game.add.sprite(20, 20, 'oneLife');
    } else if (life > 0) {
        player = game.add.sprite(20, 20, 'dead');
    }

    // Movimiento vertical
    if (this.cursors.up.isDown) {
        this.body.velocity.y = -this.walking_speed;
        this.scale.x = 1;
        this.animations.play("walking");
    } else if (this.cursors.down.isDown) {
        this.body.velocity.y = +this.walking_speed;
        this.scale.x = -1;
        this.animations.play("walking");
    }

    // Movimiento horizontal
    if (this.cursors.left.isDown) {
        this.body.velocity.x = -this.walking_speed;
        this.scale.x = 1;
        this.animations.play("walking");
    } else if (this.cursors.right.isDown) {
        this.body.velocity.x = +this.walking_speed;
        this.scale.x = -1;
        this.animations.play("walking");
    }

    // Parar la animación y la velocidad si no hay nada pulsado
    if (!this.cursors.up.isDown && !this.cursors.down.isDown) {
        this.body.velocity.y = 0;
    }
    if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
        this.body.velocity.x = 0;
    }
    if ((!this.cursors.up.isDown && !this.cursors.down.isDown) && (!this.cursors.left.isDown && !this.cursors.right.isDown)) {
        this.animations.stop();
        this.frame = 0;
    }
};