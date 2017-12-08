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
var Sala0 = {Id: 0, isEmpty: true, exists: false, numJugadores: 0, button:"", textButton: "Nº de Jugadores: "+numJugadores[0]+"/2"};
var Sala1 = {Id: 1, isEmpty: true, exists: false, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+numJugadores[1]+"/2"};
var Sala2 = {Id: 2, isEmpty: true, exists: false, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+numJugadores[2]+"/2"};
var Sala3 = {Id: 3, isEmpty: true, exists: false, numJugadores: 0, button:"",  textButton: "Nº de Jugadores: "+numJugadores[3]+"/2"};

var lobby = [Sala0, Sala1, Sala2, Sala3];
var wallpaper;
var button;
var numLobbies;
//Override init de la superclase
SearchingLobby.prototype.init = function (sala) {
    function getNumSalas() {
        $.ajax({
            url: 'http://localhost:8181/dungeon'
        }).done(function(data){
            console.log(data);

            numLobbies = data;
        });
    }
    getNumSalas();
    console.log(numLobbies);
    
    this.sala = sala;

    for(var i=0; i<numLobbies; i++){
        lobby[i].exists = true;
    }

    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

SearchingLobby.prototype.preload = function () {
    
    game.load.image('wallpaper',  'img/fondosalas.png');
    game.load.spritesheet('Lobby', 'img/botones.png', 225, 75);
    game.load.spritesheet('Button', 'img/buttons.png', 95, 25);
};


//Override de create de la superclase
SearchingLobby.prototype.create = function () {
    
    console.log(numLobbies);
    var style = {
        font: "30px Berlin Sans FB",
        fill: "#000000",
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
        if(numLobbies < 4){
            game.state.start("LobbyState", true, false, this.sala);
        }
        
        
        
    }

    var text = game.add.text(game.world.centerX, 60, "SELECCIONA UNA SALA O CREA UNA", style);
    text.scale.setTo(1.3);
    text.anchor.set(0.5);

    // Esto es para hacer lo que viene a continuación pero más eficiente, no está completo

    for(var i=0; i<4; i++){
        lobby[i].button = game.add.button(550, 170+100*i, 'Lobby', onClickB, {pos: i}); 
        lobby[i].button.anchor.set(0.5);
    }


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
        lobby[this.pos].button.scale.setTo(1.2);
    }

    function outB(){
        lobby[this.pos].button.scale.setTo(1.0);
    }

    function onClickB(){
        hero_id = this.pos;
        $.ajax({           
            url: 'http://localhost:8181/dungeon/' + this.pos,
        }).done(function (data) {
            //console.log("Sala creada: " + JSON.stringify(data));
            console.log(data);
            game.state.start("InitDungeonState", true, false, data);
        });
        // if(lobby[this.pos].isEmpty){
        //     game.state.start("LobbyState", true, false);
        // }
    }

    // if(lobby[0].exists){
    //     var text0 = game.add.text(180, 320, lobby[0].textButton, style);
    //     text0.anchor.set(0.5);
    // }
    // if(lobby[1].exists){
    //     var text1 = game.add.text(500, 320, lobby[1].textButton, style);
    //     text1.anchor.set(0.5);
    // }
    // if(lobby[2].exists){
    //     var text2 = game.add.text(180, 570, lobby[2].textButton, style);
    //     text2.anchor.set(0.5);
    // }
    // if(lobby[3].exists){
    //     var text3 = game.add.text(500, 570, lobby[3].textButton, style);
    //     text3.anchor.set(0.5);
    // }


    // lobby[0].button = game.add.button(550, 170, 'Lobby', onClickB, {pos: 0}); //////////////////////////////////////////////////////////////////////////////////
    // lobby[0].button.anchor.set(0.5);

    // lobby[1].button = game.add.button(550, 270, 'Lobby', onClickB, {pos: 1});
    // lobby[1].button.anchor.set(0.5);

    // lobby[2].button = game.add.button(550, 370, 'Lobby', onClickB, {pos: 2});
    // lobby[2].button.anchor.set(0.5);

    // lobby[3].button = game.add.button(550, 470, 'Lobby', onClickB, {pos: 3});
    // lobby[3].button.anchor.set(0.5);


};