var ProceduralGeneration = ProceduralGeneration || {};

ProceduralGeneration.Trienemy = function (game_state, name, position, properties) {

    ProceduralGeneration.Prefab.call(this, game_state, name, position, properties);

    this.anchor.setTo(0.5);
    this.game_state.game.physics.arcade.enable(this);
    drawmouse = "";
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

    gest.addGesture("Line", [{
        x: 0,
        y: 0
    }, {
        x: 0,
        y: 100
    }], callback);

    gest.addGesture("Square", [{
            x: 0,
            y: 0
        },
        {
            x: 200,
            y: 0
        },
        {
            x: 200,
            y: 200
        },
        {
            x: 0,
            y: 200
        },
        {
            x: 0,
            y: 0
        }
    ], callback);

	gest.addGesture("Check", [
		{x: 0, y: 0},
		{x: 50, y: 50},
		{x: 100, y: 0},
	], callback);

    trienemytokill = this;

    function callback(name) {
        gest.clear();
        if (name == "Check") {
            trienemytokill.kill();
        }
    }
};

ProceduralGeneration.Trienemy.prototype = Object.create(ProceduralGeneration.Prefab.prototype);
ProceduralGeneration.Trienemy.prototype.constructor = ProceduralGeneration.Trienemy;

ProceduralGeneration.Trienemy.prototype.update = function () {


};