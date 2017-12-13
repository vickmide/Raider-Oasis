//Constructor SearchingLobby
SearchingLobby = function () {
    "use strict";
    Phaser.State.call(this); //llamada al constructor padre
};

//Subclase extiende de superclase
SearchingLobby.prototype = Object.create(Phaser.State.prototype);
//Se le asigna a SearchingLobby el constructor correspondiente
SearchingLobby.prototype.constructor = ProceduralGeneration.SearchingLobby;

//VARIABLES PHASER
var wallpaper;
//Botón Crear
var button;
var numSalas;
var numJugadores;

//Override init de la superclase
SearchingLobby.prototype.init = function (sala) {
    //MÉTODOS API'S REST
    function getNumSalas() {
        $.ajax({
            url: 'http://localhost:8181/dungeon'
        }).done(function(data){
            console.log(data);
            numSalas = data;
        });
    }
    getNumSalas();

    this.sala = sala;

    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};


//PRELOAD
SearchingLobby.prototype.preload = function () {
    game.load.image('wallpaper',  'img/fondosalas.png');
    game.load.spritesheet('Lobby', 'img/botones.png', 225, 75);
    game.load.spritesheet('Button', 'img/buttons.png', 95, 25);
};

//CREATE
SearchingLobby.prototype.create = function () {
    var style = {font: "30px Berlin Sans FB", fill: "#000000", align: "center"};

    wallpaper = game.add.sprite(0, 0, 'wallpaper');

    button = game.add.button(game.world.centerX, 660, 'Button', crearSala, this);
    button.anchor.set(0.5);
    button.scale.setTo(1.5);

    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);


    //EVENTOS DE BOTONES PARA EL BOTÓN CREAR
    function over(){
        button.frame = 2;
    }

    function out(){
        button.frame = 0;
    }

    function crearSala(){
        button.frame = 1;
        if(numSalas < 4){
            game.state.start("LobbyState", true, false, this.sala);
        }
    }
    //Texto
    var text = game.add.text(game.world.centerX, 60, "SELECCIONA UNA SALA O CREA UNA", style);
    text.scale.setTo(1.3);
    text.anchor.set(0.5);
};

var mimensaje = true;

//UPDATE
SearchingLobby.prototype.update = function () {
    //console.log("En update: " + numSalas);
 
    // function overB(){
    //     lobby[this.pos].button.scale.setTo(1.2);   
    // }

    // function outB(){
    //     lobby[this.pos].button.scale.setTo(1.0);
    // }

    function onClickB(){
        hero_id = this.pos;
        lobbyactual = this.pos;
        $.ajax({
            url: 'http://localhost:8181/dungeon/' + this.pos,
        }).done(function (data) {
        	console.log(hero_id);
        	mensaje = {"protocolo":"joinSala_msg","id":hero_id};
            connection.send(JSON.stringify(mensaje));
            game.state.start("InitDungeonState", true, false, data);
        });
    }
    function actualizarLobby(){
        for(var i=0; i<4; i++){
            lobby[i].button = game.add.button(550, 170+100*i, 'Lobby', onClickB, {pos: i});
            lobby[i].button.anchor.set(0.5);
        }
    
    
        for(var i=0; i<numSalas; i++){
            if(lobby[i].isEmpty){
                lobby[i].button.frame = 1;
            }else{
                lobby[i].button.frame = 2;
            }
        }
        
        if (WSResponse_salaCreada) {
            console.log("El numero de salas ahora es = " + numSalas);
            WSResponse_salaCreada = false;
        }
        
        // for(var i=0; i<numSalas; i++){
        //     if(lobby[i].isEmpty){
        //         lobby[i].button.onInputOver.add(overB, {pos: i});
        //         lobby[i].button.onInputOut.add(outB, {pos: i});
        //     }
        // }
    }
    actualizarLobby();
};
