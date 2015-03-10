// Using to control the speed of the enemies (highter the number the faster they go!)
var throttle = 155;

// Enemies our player must avoid
var Enemy = function() {
    this.y = Math.floor(Math.random()*2.999);
    this.x = -2;
    this.speed = 0.5*(1+throttle/50) + Math.random()*(1+throttle/50);
 
 // The image/sprite for our enemies, this uses
 // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x >= 6){
        this.x = -2;
        this.speed = 0.5*(1+throttle/50) + Math.random()*(1+throttle/50);
        this.y = Math.floor(Math.random()*2.999);
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 80 , 50 + this.y * 100); 
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 2;
    this.y = 4;
    this.sprite = 'images/char-boy.png';
};

// Update the player to the start positon
Player.prototype.home = function() {
    this.x = 2;
    this.y = 4;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 80 , 50 + this.y * 100);    
};

// Player movements
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && this.x > 0) {
        this.x -= 1;
    } else if (keyCode === 'right' && this.x < 5) {
        this.x += 1;
    } else if (keyCode === 'down' && this.y < 4) {
        this.y += 1;
    } else if (this.y >= 0) {
         this.y -= 1;
    }
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Control the number of enemies on the screen
for (var i = 0; i < 5; i++){
    allEnemies[i] = new Enemy();
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
