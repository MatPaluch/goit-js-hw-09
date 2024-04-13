function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('BODY');
let timerID = null;
stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', e => {
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 500);
});

stopBtn.addEventListener('click', e => {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
  clearInterval(timerID);
});
