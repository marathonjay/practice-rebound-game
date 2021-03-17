document.addEventListener("DOMContentLoaded", function() {
let ball;
let paddle;
let score;
let playingArea;

let aWidth;
let aHeight;
let pWidth;
let pHeight;
let dx = 2;
let dy = 2;
let pdx = 48;
let currentScore = 0;
let timer;
let paddleLeft = 228;
let ballLeft = 100;
let ballTop = 8;


window.addEventListener("load", init);
window.addEventListener("resize", init);

function init() {
  ball = document.getElementById("ball");
  paddle = document.getElementById("paddle");
  score = document.getElementById("score");
  playingArea = document.getElementById("playingArea");
  document.addEventListener("keydown", keyListener, false);
  layoutPage();
  timer = requestAnimationFrame(start);
}

function layoutPage() {
  aWidth = innerWidth;
  aHeight = innerHeight;
  pWidth = aWidth - 22;
  pHeight = aHeight - 22;
  playingArea.style.width = pWidth + "px";
  playingArea.style.height = pHeight + "px";
}

function keyListener(e) {
  let key = e.keyCode;
  if ((key == 37 || key == 65) && paddleLeft > 0) {
    paddleLeft -= pdx;
    if (paddleLeft < 0)
      paddleLeft = 0;
  } else if ((key == 39 || key == 68) && paddleLeft < pWidth - 64) {
    paddleLeft += pdx;
    if (paddleLeft > pWidth - 64)
      paddleLeft = pWidth - 64;
  }
  paddle.style.left = paddleLeft + "px";
}

function start() {
  render();
  detectCollisions();
  difficulty();
  if (ballTop < pHeight - 36) {
    timer = requestAnimationFrame(start);
  } else {
    gameOver();
  }
}

function render() {
  moveBall();
  updateScore();
}

function moveBall() {
  ballLeft += dx;
  ballTop += dy;
  ball.style.left = ballLeft + "px";
  ball.style.top = ballTop + "px";
}

function updateScore() {
  currentScore += 5;
  score.innerHTML = "Score: " + currentScore;
}

function detectCollisions() {
  if (collisionX()) {
    dx *= -1;
  }
  if (collisionY()) {
    dy *= -1;
  }
}

function collisionX() {
  if (ballLeft < 4 || ballLeft > pWidth - 20) {
    return true;
  }
}

function collisionY() {
  if (ballTop < 4) {
    return true;
  }
  if (ballTop > pHeight - 64) {
    if (ballLeft >= paddleLeft && ballLeft <= paddleLeft + 64) {
      return true;
    }
  }
  return false;
}

function difficulty() {
  if (currentScore % 1000 == 0) {
    if (dy > 0) 
      dy +=2;
    else
      dy -= 2;
  }
}

function gameOver() {
  cancelAnimationFrame(timer);
  score.innerHTML += "    Game Over!";
  score.style.backgroundColor = "red";
}









  // Add your Javascript Here
})