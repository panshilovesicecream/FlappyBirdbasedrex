// Get the canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 400;

// Define the T-Rex and obstacle objects
const trex = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    velocity: 0,
    gravity: 0.5
};

const obstacle = {
    x: canvas.width,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    velocity: -5
};

// Define the game state
let gameOver = false;

// Draw the T-Rex and obstacle
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#666';
    ctx.fillRect(trex.x, trex.y, trex.width, trex.height);
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Update the game state
function update() {
    if (!gameOver) {
        // Update the T-Rex position
        trex.velocity += trex.gravity;
        trex.y += trex.velocity;

        // Update the obstacle position
        obstacle.x += obstacle.velocity;

        // Check for collision
        if (trex.x + trex.width > obstacle.x && trex.x < obstacle.x + obstacle.width && trex.y + trex.height > obstacle.y) {
            gameOver = true;
        }

        // Check if the obstacle is off the screen
        if (obstacle.x < -obstacle.width) {
            obstacle.x = canvas.width;
        }
    }
}

// Handle user input
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        trex.velocity = -10;
    }
});

// Restart the game
document.getElementById('restart-button').addEventListener('click', () => {
    gameOver = false;
    trex.x = canvas.width / 2;
    trex.y = canvas.height - 50;
    trex.velocity = 0;
    obstacle.x = canvas.width;
    obstacle.y = canvas.height - 50;
    obstacle.velocity = -5;
    draw();
    update();
});

// Main game loop
setInterval(() => {
    draw();
    update();
}, 16);

// Show the restart button when the game is over
setInterval(() => {
    if (gameOver) {
        document.getElementById('restart-button').style.display = 'block';
    } else {
        document.getElementById('restart-button').style.display = 'none';
    }
}, 100);