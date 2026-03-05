const arena = document.getElementById("arena");
const ball = document.getElementById("ball");

const startBtn = document.getElementById("startBtn");
const stopBtn  = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let x = 10, y = 10;     // position
let vx = 4, vy = 3;     // velocity (speed + direction)
let timer = null;

function step(){
  const arenaRect = arena.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  const ballSize = ballRect.width; // 50

  // move
  x += vx;
  y += vy;

  // bounce on left/right
  if (x <= 0) { x = 0; vx *= -1; }
  if (x + ballSize >= arenaRect.width) { x = arenaRect.width - ballSize; vx *= -1; }

  // bounce on top/bottom
  if (y <= 0) { y = 0; vy *= -1; }
  if (y + ballSize >= arenaRect.height) { y = arenaRect.height - ballSize; vy *= -1; }

  // apply
  ball.style.left = x + "px";
  ball.style.top  = y + "px";
}

function start(){
  if (timer) return; // prevent multiple intervals
  timer = setInterval(step, 16); // ~60 FPS
}

function stop(){
  clearInterval(timer);
  timer = null;
}

function reset(){
  stop();
  x = 10; y = 10;
  vx = 4; vy = 3;
  ball.style.left = x + "px";
  ball.style.top  = y + "px";
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

// optional: start automatically
start();