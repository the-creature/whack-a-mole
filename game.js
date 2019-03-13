const holes = document.querySelectorAll('.hole');
const gameTime = 30; // seconds
let timeUp = false;
let score = 0;
let countdown = gameTime;
let lastHole = -1;
let gameTimer = null;
let countDownTimer = null;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function play() {
  const time = randomTime(400, 1200);
  const hole = randomHole(holes);
  hole.classList.add('active');

  // start game timer
  gameTimer = setTimeout(() => {
    hole.classList.remove('active');
    if (!timeUp) play();
  }, time);
}

function resetTimer() {
  if (gameTimer) {
    clearTimeout(gameTimer);
  }
  if (countDownTimer) {
    clearInterval(countDownTimer);
  }
}

function start() {
  // start countdown timer
  reset();
  timeUp = false;

  countDownTimer = setInterval(() => {
    countdown--;
    if (countdown <= 0) {
      timeUp = true;
      stop();
    }
    document.getElementById('countdown').value = countdown;
  }, 1000);
  play();
}

function stop() {
  timeUp = true;
  resetTimer();
}

function reset() {
  score = 0;
  lastHole = -1;
  countdown = gameTime;
  timeUp = true;

  document.getElementById('countdown').value = '0';
  document
    .querySelectorAll('.hole.active')
    .forEach(hole => hole.classList.remove('active'));

  resetTimer();
  refreshScore();
}

function refreshScore() {
  document.getElementById('score').value = score;
}

function init() {
  document.getElementById('game').addEventListener('click', function(event) {
    if (event.target.matches('.hole.active') && !timeUp) {
      score++;
      refreshScore();
    }
    if (event.target.matches('.start')) {
      start();
    }
    if (event.target.matches('.stop')) {
      stop();
    }
    if (event.target.matches('.reset')) {
      reset();
    }
  });
}

init();
