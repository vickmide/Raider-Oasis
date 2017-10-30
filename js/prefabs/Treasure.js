var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.Treasure = function (game_state, name, position, properties) {

    ProceduralGeneration.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);
    //this.scale.setTo(0.9, 0.9);
    this.game_state.game.physics.arcade.enable(this);
    //this.body.immovable = true;
    this.body.collideWorldBounds = true;
    
};

ProceduralGeneration.Treasure.prototype = Object.create(ProceduralGeneration.Prefab.prototype);
ProceduralGeneration.Treasure.prototype.constructor = ProceduralGeneration.Treasure;

ProceduralGeneration.Treasure.prototype.update = function () {

    if(this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.heroes, this.kill, null, this)){

        score = score + 100;
        scoreText.text = "score: " + score;
    }
};