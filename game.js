import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

let lastRenderedTime = 0;
const gameBoard = document.getElementById('game-board');
let gameOver = false;

/* -------------------------------------------------------------------------- */
/*                                  game loop                                 */
/* -------------------------------------------------------------------------- */
function main(currentTime) {

    if(gameOver) {
        if(confirm('Game over YOu loose... Press OK to restart')) {
            window.location.reload();
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderedTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;


    lastRenderedTime = currentTime;


    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}