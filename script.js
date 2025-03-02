const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;

// food's position
let foodX, foodY;

// Entry point
let snakeX = 5, snakeY = 5;

// Snake's speed
let velocityX = 0, velocityY = 0;

// Body of snake
let snakeBody = [];

// Control of game loop
let setIntervalId;

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

highScoreElement.innerText = `Max. Score: ${highScore}`;

// Food's location will be random

const updateFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

// Game over 

const handleGameOver = ()=>{

    clearInterval(setIntervalId);
    alert("Game Over! Press TAMAM for play")
    location.reload();

};

// Snake's rotation
const changeDirection = (e)=>{
    if(e.key === "ArrowUp" && velocityY  !== 1){
        velocityX =0;
        velocityY =-1;
    }
    else if(e.key === "ArrowDown" && velocityY !==-1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key ==="ArrowLeft" && velocityX !==1){
        velocityY =0;
        velocityX = -1;
    }
    else if(e.key ==="ArrowRight" && velocityX !==-1){
        velocityY = 0;
        velocityX = 1;
    }

};

// Starting to the game

const initGame = () =>{
    if(gameOver) return handleGameOver();

    let html = `<div class ="food" style="grid-area:${foodY} / ${foodX}"></div>`;

    if(snakeX ===foodX && snakeY ===foodY){
        // New food location
        updateFoodPosition();

        // Update the snake's body
        snakeBody.push([foodY,foodX]);

        // Update the highscore
        score++;
        highScore = score >=highScore ? score : highScore;

        // updating localstorage
        localStorage.setItem("high-score", highScore);

        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `Max. Score: ${highScore}`;
    }

    // Update the snake's head
    snakeX += velocityX;
    snakeY += velocityY;

    // Snake's movement

    for(let i =snakeBody.length -1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if(snakeX <=0 || snakeX >30 || snakeY <=0 || snakeY >30){
        return (gameOver = true);
    }


    for(let i=0;i<snakeBody.length; i++){
        html += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`

        if(i !==0  && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver= true;
        }

    }

    // Update the board
    playBoard.innerHTML = html;

};

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup",changeDirection);
