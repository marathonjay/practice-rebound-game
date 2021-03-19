document.addEventListener("DOMContentLoaded", function() {
let ball;
let paddle;
let score;
let playingArea;
let gear;
let controls;
let newButton;
let difficultySelect;
let doneButton;
let snd;
let music;


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
let drag = false;
let sndEnabled = false;
let musicEnabled = false;

let beepX;
let beepY;
let beepPaddle;
let beepGameOver;
let bgMusic;


window.addEventListener("load", init);
window.addEventListener("resize", init);

/*------------FUNCTION - INIT----------------------*/

function init() {
  ball = document.getElementById("ball");
  paddle = document.getElementById("paddle");
  score = document.getElementById("score");
  playingArea = document.getElementById("playingArea");
  gear = document.getElementById("gear");
  controls = document.getElementById("controls");
  newButton = document.getElementById("new");
  difficultySelect = document.getElementById("difficulty");
  doneButton = document.getElementById("done");
  snd = document.getElementById("snd");
  music = document.getElementById("music");

  layoutPage();
  document.addEventListener("keydown", keyListener, false);

  playingArea.addEventListener("mousedown", mouseDown, false);
  playingArea.addEventListener("mousemove", mouseMove, false);
  playingArea.addEventListener("mouseup", mouseUp, false);

  playingArea.addEventListener("touchstart", mouseDown, false);
  playingArea.addEventListener("touchmove", mouseMove, false);
  playingArea.addEventListener("touchend", mouseUp, false);

  gear.addEventListener("click", showSettings, false);
  newButton.addEventListener("click", newGame, false);
  doneButton.addEventListener("click", hideSettings, false);
  difficultySelect.addEventListener("change", function() {
    setDifficulty(difficultySelect.selectedIndex);
  }, false);
  snd.addEventListener("click", toggleSound, false);
  music.addEventListener("click", toggleMusic, false);



  
  timer = requestAnimationFrame(start);
}








/*------------FUNCTION - LAYOUT----------------------*/

function layoutPage() {
  aWidth = innerWidth;
  aHeight = innerHeight;
  pWidth = aWidth - 22;
  pHeight = aHeight - 22;
  playingArea.style.width = pWidth + "px";
  playingArea.style.height = pHeight + "px";
}

/*------------FUNCTION - KEY LISTENER----------------------*/

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

/*------------FUNCTION - START----------------------*/

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

/*------------FUNCTION - RENDER----------------------*/

function render() {
  moveBall();
  updateScore();
}

/*------------FUNCTION - MOVE BALL----------------------*/

function moveBall() {
  ballLeft += dx;
  ballTop += dy;
  ball.style.left = ballLeft + "px";
  ball.style.top = ballTop + "px";
}

/*------------FUNCTION - UPDATE SCORE----------------------*/

function updateScore() {
  currentScore += 5;
  score.innerHTML = "Score: " + currentScore;
}

/*------------FUNCTION - DETECT COLLISIONS----------------------*/

function detectCollisions() {
  if (collisionX()) {
    dx *= -1;
  }
  if (collisionY()) {
    dy *= -1;
  }
}

/*------------FUNCTION - COLLISION X ----------------------*/

function collisionX() {
  if (ballLeft < 4 || ballLeft > pWidth - 20) {
    playSound(beepX);
    return true;
  }
}

/*------------FUNCTION - COLLISION Y ----------------------*/

function collisionY() {
  if (ballTop < 4) {
    playSound(beepY);
    return true;
  }
  if (ballTop > pHeight - 64) {
    
    if (ballLeft >= paddleLeft && ballLeft <= paddleLeft + 64) {
      playSound(beepPaddle);
      return true;
    }
  }
  return false;
}

/*------------FUNCTION - DIFFICULTY----------------------*/

function difficulty() {
  if (currentScore % 1000 == 0) {
    if (dy > 0) 
      dy +=2;
    else
      dy -= 2;
  }
}

/*------------FUNCTION - GAME OVER----------------------*/

function gameOver() {
  cancelAnimationFrame(timer);
  score.innerHTML += "    Game Over!";
  score.style.backgroundColor = "red";
  playSound(beepGameOver);
}

/*------------FUNCTION - MOUSE DOWN----------------------*/

function mouseDown(e) {
  drag = true;
}

/*------------FUNCTION - MOUSE UP----------------------*/

function mouseUp(e) {
  drag = false;
}

/*------------FUNCTION - MOUSE MOVE----------------------*/

function mouseMove(e) {
  if (drag) {
    e.preventDefault();
    paddleLeft = e.clientX - 32 || e.targetTouches[0].pageX - 32;
    if (paddleLeft < 0)
      paddleLeft = 0;
    if (paddleLeft > (pWidth - 64))
      paddleLeft = pWidth - 64;
    paddle.style.left = paddleLeft + "px";
  }
}

/*------------FUNCTION - SHOW SETTINGS----------------------*/

function showSettings() {
  controls.style.display = "block";
  cancelAnimationFrame(timer);
}

/*------------FUNCTION - HIDE SETTINGS----------------------*/

function hideSettings() {
  controls.style.display = "none";
  timer = requestAnimationFrame(start);
}
/*------------FUNCTION - SET DIFFICULTY---------------------*/

function setDifficulty(diff) {
  switch(diff) {
    case 0:
      dy = 2;
      pdx = 48;
      break;
    case 1:
      dy = 4;
      pdx = 32;
      break;
    case 2:
      dy = 6;
      pdx = 16;
      break;
    default:
      dy = 2;
      pdx = 48;
  }
}

/*------------FUNCTION - NEW GAME---------------------*/

function newGame() {
  ballTop = 8;
  currentScore = 0;
  dx = 2;
  setDifficulty(difficultySelect.selectedIndex);
  score.style.backgroundColor = "rgb(32, 128, 64)";
  hideSettings();
}

/*------------FUNCTION - INIT AUDIO----------------------*/


function initAudio() {
  //load audio files
  beepX = new Audio("assets/sounds/beepX.mp3");
  beepY = new Audio("assets/sounds/beepY.mp3");
  beepPaddle = new Audio("assets/sounds/beepPaddle.mp3");
  beepGameOver = new Audio("assets/sounds/beepGameOver.mp3");
  bgMusic = new Audio("assets/sounds/music.mp3");
  //turn off volume
  beepX.volume = 0;
  beepY.volume = 0;
  beepPaddle.volume = 0;
  beepGameOver.volume = 0;
  bgMusic.volume = 0;
  //play each file
  //this grants permission
  beepX.play();
  beepY.play();
  beepPaddle.play();
  beepGameOver.play();
  bgMusic.play();
  //pause each file
  //this stores them in memory for later
  beepX.pause();
  beepY.pause();
  beepPaddle.pause();
  beepGameOver.pause();
  bgMusic.pause();
  //set the volume back for next time
  beepX.volume = 1;
  beepY.volume = 1;
  beepPaddle.volume = 1;
  beepGameOver.volume = 1;
  bgMusic.volume = 1;
}

function toggleSound() {
  if (beepX == null) {
    initAudio();
  }
  sndEnabled = !sndEnabled;
}

function playSound(objSound) {
  if(sndEnabled)
    objSound.play();
}

function toggleMusic() {
  if (bgMusic == null) {
    initAudio();
  }
  if (musicEnabled)
  bgMusic.pause();
  else {
    bgMusic.loop = true;
    bgMusic.play()
  };
  musicEnabled = !musicEnabled;
}
















  // Add your Javascript Here
})