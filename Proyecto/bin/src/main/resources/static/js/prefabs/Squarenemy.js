var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.Squarenemy = function (game_state, name, position, properties) {

    ProceduralGeneration.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);
    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    
    this.body.immovable = true;
    var gest = new gestures({
        debug: true,
        draw: true,
        drawColor: "#000000",
        drawWidth: 5,
        autoTrack: true,
        allowRotation: true,
        inverseShape: true,
        points: 33
    });
    
    gest.addGesture("Line", [ {x: 0, y: 0},{x: 0, y: 100}], callback);
    
    gest.addGesture("Square", [
            {x: 0, y: 0},
            {x: 200, y: 0},
            {x: 200, y: 200},
            {x: 0, y: 200},
            {x: 0, y: 0}
    ], callback);
    
	gest.addGesture("Check", [
		{x: 0, y: 0},
		{x: 50, y: 50},
		{x: 100, y: 0},
	], callback);
    
    squarenemytokill = this;
    function callback(name){
        gest.clear();
        if (name=="Square"){
            squarenemytokill.kill();
        }
    }
};

ProceduralGeneration.Squarenemy.prototype = Object.create(ProceduralGeneration.Prefab.prototype);
ProceduralGeneration.Squarenemy.prototype.constructor = ProceduralGeneration.Squarenemy;

ProceduralGeneration.Squarenemy.prototype.update = function () {
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    
    var distance = this.game.math.distance(this.x, this.y, globalhero.x, globalhero.y);
    var rotation = this.game.math.angleBetween(this.x, this.y, globalhero.x, globalhero.y);
    this.body.velocity.x = Math.cos(rotation) * 90;
    this.body.velocity.y = Math.sin(rotation) * 90;
}; 



