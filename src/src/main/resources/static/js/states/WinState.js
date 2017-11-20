//Constructor WinState
WinState = function (score) {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre
};


//Subclase extiende de superclase
WinState.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a WinState el constructor correspondiente
WinState.prototype.constructor = ProceduralGeneration.WinState;

//Override init de la superclase
WinState.prototype.init = function (score) {
    "use strict";
    this.score = score;
};


//Override de create de la superclase
WinState.prototype.create = function () {
    "use strict";
    var style = {
        font: "30px Arial",
        fill: "#ffffff",
        align: "center"
    };
    var text = game.add.text(game.world.centerX, game.world.centerY, "- ¡HAS LOGRADO ESCAPAR! -\nHas huido de la mazmorra\nTu puntuación total: " + this.score, style);
    text.anchor.set(0.5);
};