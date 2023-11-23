// Get references to the game objects
const bird = document.querySelector('.bird');
const pipe1 = document.querySelector('.pipe');
const pipe2 = document.querySelector('.pipe').cloneNode();

// Set up the game state
let gameStarted = false;
let score = 0;

// Define the game logic
function update() {
    // Update the bird's position
    const birdY = bird.offsetTop + (bird.offsetHeight / 2) - (window.innerHeight / 2);
    bird.style.top = `${birdY}px`;

    // Check if the bird has collided with a pipe
    const collision = pipe1.offsetLeft <= bird.offsetLeft && pipe1.offsetLeft + pipe1.offsetWidth >= bird.offsetLeft + bird.offsetWidth;
    if (collision || bird.offsetBottom > window.innerHeight) {
        // Reset the game state
        gameStarted = false;
        score = 0;
        bird.style.transform = `translateY(${window.innerHeight / 2}px)`;
    } else {
        // Increment the score
        score++;
        document.querySelector('.score').textContent = `Score: ${score}`;
    }

    // Move the pipes
    pipe1.style.left = `-${pipe1.offsetWidth / 2}px`;
    pipe2.style.left = `-${pipe2.offsetWidth / 2}px`;
}

// Handle user input
document.addEventListener('keydown', event => {
    if (event.code === 'ArrowUp') {
        // Make the bird flap
        bird.classList.add('flapping');
    }
});

// Start the game loop
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameStarted = true;
gameLoop();
