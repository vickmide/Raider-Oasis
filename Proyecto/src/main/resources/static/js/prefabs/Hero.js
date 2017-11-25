var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.Hero = function (game_state, name, position, properties) {
    ProceduralGeneration.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;

    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    
    this.animations.add("walking", [1, 2, 3, 4], 6, true);
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    globalhero = this;
};

ProceduralGeneration.Hero.prototype = Object.create(ProceduralGeneration.Prefab.prototype);
ProceduralGeneration.Hero.prototype.constructor = ProceduralGeneration.Hero;

ProceduralGeneration.Hero.prototype.update = function () {
     
     this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
     if(this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.enemies, null, null, this) ||
     this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.trienemies, null, null, this) ||
         this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.squarenemies, null, null, this)){
        life = life - 1;
        
        
        if (life <= 0){
            game.state.start("GameOverState", true, false, score);
        }
    }   
     if(life >= 500){
            player = game.add.sprite(20, 20, 'fullLife');
        }else if(life > 400){
            player = game.add.sprite(20, 20, 'fourLife');
        }else if(life > 300){
            player = game.add.sprite(20, 20, 'threeLife');
        }else if(life > 200){
            player = game.add.sprite(20, 20, 'twoLife');
        }else if(life > 100){
            player = game.add.sprite(20, 20, 'oneLife');
        }else if(life > 0){
            player = game.add.sprite(20, 20, 'dead');
        }

    // Movimiento vertical
     if(this.cursors.up.isDown)
     {
        this.body.velocity.y = -this.walking_speed;
        this.scale.x = 1;
        this.animations.play("walking");
     } else if(this.cursors.down.isDown)
     {
        this.body.velocity.y = +this.walking_speed;
        this.scale.x = -1;
        this.animations.play("walking"); 
     }

     // Movimiento horizontal
     if(this.cursors.left.isDown)
     {
        this.body.velocity.x = -this.walking_speed;
        this.scale.x = 1;
        this.animations.play("walking"); 
     } else if(this.cursors.right.isDown)
     {
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
