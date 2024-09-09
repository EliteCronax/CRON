function startFlappyBird() {
    const gameContainer = document.getElementById('game-container');
    const width = 40;
    const height = 20;
    let bird = { x: 5, y: 10 };
    let pipes = [];
    let score = 0;
    let gameOver = false;

    function createPipe() {
        const gap = 5;
        const topHeight = Math.floor(Math.random() * (height - gap - 2)) + 1;
        pipes.push({
            x: width - 1,
            topHeight: topHeight,
            bottomY: topHeight + gap
        });
    }

    function drawGame() {
        let gameArea = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (x === bird.x && y === bird.y) {
                    gameArea += '?';
                } else if (pipes.some(pipe => 
                    (x === pipe.x && (y < pipe.topHeight || y >= pipe.bottomY)))) {
                    gameArea += '|';
                } else {
                    gameArea += '.';
                }
            }
            gameArea += '\n';
        }
        gameContainer.innerHTML = `<pre>${gameArea}</pre>Score: ${score}`;
    }

    function updateGame() {
        if (gameOver) return;
        bird.y++;
        if (bird.y >= height) gameOver = true;
        pipes.forEach(pipe => {
            pipe.x--;
            if (pipe.x === bird.x && (bird.y < pipe.topHeight || bird.y >= pipe.bottomY)) {
                gameOver = true;
            }
        });
        pipes = pipes.filter(pipe => pipe.x >= 0);
        if (pipes.length === 0 || pipes[pipes.length - 1].x < width - 10) {
            createPipe();
        }
        if (pipes[0].x === bird.x) score++;
        drawGame();
        if (gameOver) {
            gameContainer.innerHTML += '<br>Game Over! Click to restart.';
            gameContainer.onclick = startFlappyBird;
        } else {
            setTimeout(updateGame, 200);
        }
    }

    function jump() {
        if (!gameOver) {
            bird.y -= 3;
            if (bird.y < 0) bird.y = 0;
        }
    }

    document.addEventListener('keydown', jump);
    gameContainer.addEventListener('click', jump);
    createPipe();
    updateGame();
}
