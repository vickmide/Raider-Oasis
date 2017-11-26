var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('wall', 'assets/platform2.png');
    //game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}


var player;
var platforms;
var cursors;
var enemy;

var stars;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    // Crea un grupo de enemigos


    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    var ceil = platforms.create(0, 0, 'ground');
    var leftWall = platforms.create(0, 0, 'wall');
    var rightWall = platforms.create(800 - 64, 0, 'wall');
    

    //Activa colisiones

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    ceil.scale.setTo(2, 2);

    leftWall.scale.setTo(2, 2);
    //leftWall.angle = 90;

    rightWall.scale.setTo(2, 2);
    //rightWall.angle = 90;

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    ceil.body.immovable = true;
    rightWall.body.immovable = true;
    leftWall.body.immovable = true;


    // The player and its settings
    player = game.add.sprite(500, 300, 'dude');
    enemy = game.add.sprite(200, 200, 'dude');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(enemy);

    //  Player physics properties. Give the little guy a slight bounce.
    //player.body.bounce.y = 0.2;
    //player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    enemy.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    enemy.animations.add('right', [5, 6, 7, 8], 10, true);
    
    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    setInterval(moveEnemy, 1500);
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.collide(enemy, platforms);
    game.physics.arcade.collide(enemy, player);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        //moveEnemy();
        player.animations.play('right');
    } else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
        player.animations.stop();
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
        player.animations.stop();
    } else {
        //  Stand still
        player.body.velocity.setTo(0, 0);
        player.animations.stop();
        player.frame = 4;
    }
    //  Allow the player to jump if they are touching the ground.
    /* if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
*/

}

function collectStar(player, star) {

    // Removes the star from the screen
    star.kill();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}
function moveEnemy () {
    var rand = Math.floor(Math.random()*4)+1
    if (rand == 1) {
        enemy.body.velocity.y = -250;
        
    } else if (rand == 2) {
        enemy.body.velocity.y = 250;
        
    } else if (rand == 3) {
        enemy.body.velocity.x = -250;
        
    } else {
        enemy.body.velocity.x = 250;  
    }
}