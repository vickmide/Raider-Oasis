//Constructor GameOver
GameOverState = function (score) {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre
};


//Subclase extiende de superclase
GameOverState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a WinState el constructor correspondiente
GameOverState.prototype.constructor = ProceduralGeneration.GameOverState;

//Override init de la superclase
GameOverState.prototype.init = function (score) {
    "use strict";
    this.score = score;
};


//Override de create de la superclase
GameOverState.prototype.create = function () {
    "use strict";
    var style = {
        font: "30px Arial",
        fill: "#ffffff",
        align: "center"
    };
    var text = game.add.text(game.world.centerX, game.world.centerY, "- ¡HAS MUERTO! -\nNo has conseguido escapar\nPuntuación total: " + this.score, style);
    text.anchor.set(0.5);
};