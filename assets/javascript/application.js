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
  detectCollision();
  difficulty();
  if (ballTop < pHeight - 36) {
    timer = setTimeout(start, 50);
  } else {
    gameOver();
  }
}









  // Add your Javascript Here
})