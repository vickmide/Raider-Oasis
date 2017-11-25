//Constructor SearchingLobby
SearchingLobby = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre
};

//Subclase extiende de superclase
SearchingLobby.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a SearchingLobby el constructor correspondiente
SearchingLobby.prototype.constructor = ProceduralGeneration.SearchingLobby;

var numJugadores = [2, 1, 0, 0];
//////////////////////////////////////////////////////////////////////////////7
var Sala0 = {Id: 0, isEmpty: false, exists: false, numJugadores: 0, button:"", textButton: "Nº de Jugadores: "+numJugadores[0]+"/2"};
var Sala1 = {Id: 1, isEmpty: true, exists: false, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+numJugadores[1]+"/2"};
var Sala2 = {Id: 2, isEmpty: true, exists: false, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+numJugadores[2]+"/2"};
var Sala3 = {Id: 3, isEmpty: true, exists: false, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+numJugadores[3]+"/2"};

var lobby = [Sala0, Sala1, Sala2, Sala3];
var wallpaper;
var button;

//Override init de la superclase
SearchingLobby.prototype.init = function (numLobbies, isEmpty) {
    "use strict";
    this.numLobbies = numLobbies;

    for(var i=0; i<numLobbies; i++){
        lobby[i].exists = true;
    }

    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

SearchingLobby.prototype.preload = function () {
    "use strict";
    game.load.image('wallpaper',  'img/FondoSearchLobby.png');
    game.load.spritesheet('Lobby', 'img/spritesheetLobby.png', 300, 300);
    game.load.spritesheet('Button', 'img/buttons.png', 95, 25);
};


//Override de create de la superclase
SearchingLobby.prototype.create = function () {
    "use strict";
    console.log(lobby[0].isEmpty);

    var style = {
        font: "30px Berlin Sans FB",
        fill: "#ffffff",
        align: "center"
    };
    wallpaper = game.add.sprite(0, 0, 'wallpaper');

    button = game.add.button(game.world.centerX, 660, 'Button', actionOnClick, this);
    button.anchor.set(0.5);
    button.scale.setTo(1.5);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);

    function over(){
        button.frame = 2;
    }

    function out(){
        button.frame = 0;
    }

    function actionOnClick(){
        button.frame = 1;
        for(var i=0; i<numLobbies; i++){
            if(lobby[i].isEmpty){
                game.state.start("LobbyState", true, false);
            }else{
                console.log("Hola");
            }
        }
    }

    var text = game.add.text(game.world.centerX, 60, "Número de salas creadas: " + numLobbies+ "/4", style);
    text.scale.setTo(1.5);
    text.anchor.set(0.5);

    // Esto es para hacer lo que viene a continuación pero más eficiente, no está completo

    // for(var i=0; i<4; i++){
    //     lobby[i] = game.add.sprite(70, 120 , 'Lobby');
    //     lobby[i].scale.setTo(0.7, 0.7);
    // }

    lobby[0].button = game.add.button(180, 230, 'Lobby', onClickB, {pos: 0});
    lobby[0].button.anchor.set(0.5);
    lobby[0].button.scale.setTo(0.7, 0.7);

    lobby[1].button = game.add.button(500, 230, 'Lobby', onClickB, {pos: 1});
    lobby[1].button.anchor.set(0.5);
    lobby[1].button.scale.setTo(0.7, 0.7);

    lobby[2].button = game.add.button(180, 480, 'Lobby', onClickB, {pos: 2});
    lobby[2].button.anchor.set(0.5);
    lobby[2].button.scale.setTo(0.7, 0.7);

    lobby[3].button = game.add.button(500, 480, 'Lobby', onClickB, {pos: 3});
    lobby[3].button.anchor.set(0.5);
    lobby[3].button.scale.setTo(0.7, 0.7);

    console.log(lobby[0].isEmpty);

    for(var i=0; i<numLobbies; i++){
        if(lobby[i].isEmpty){
            lobby[i].button.frame = 1;
        }else{
            lobby[i].button.frame = 2;
        }
    }

    for(var i=0; i<numLobbies; i++){
        if(lobby[i].isEmpty){
            lobby[i].button.onInputOver.add(overB, {pos: i});
            lobby[i].button.onInputOut.add(outB, {pos: i});
        }
    }

    function overB(){
        lobby[this.pos].button.scale.setTo(0.8);
    }

    function outB(){
        lobby[this.pos].button.scale.setTo(0.7);
    }

    function onClickB(){
        if(lobby[this.pos].isEmpty){
            game.state.start("LobbyState", true, false);
        }
    }

    if(lobby[0].exists){
        var text0 = game.add.text(180, 320, lobby[0].textButton, style);
        text0.scale.setTo(0.5);
        text0.anchor.set(0.5);
    }
    if(lobby[1].exists){
        var text1 = game.add.text(500, 320, lobby[1].textButton, style);
        text1.scale.setTo(0.5);
        text1.anchor.set(0.5);
    }
    if(lobby[2].exists){
        var text2 = game.add.text(180, 570, lobby[2].textButton, style);
        text2.scale.setTo(0.5);
        text2.anchor.set(0.5);
    }
    if(lobby[3].exists){
        var text3 = game.add.text(500, 570, lobby[3].textButton, style);
        text3.scale.setTo(0.5);
        text3.anchor.set(0.5);
    }

};