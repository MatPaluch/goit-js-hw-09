import calendar from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

const flatpickr = require('flatpickr');
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-stop]');
startBtn.setAttribute('disabled', '');
resetBtn.setAttribute('disabled', '');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');
input.classList.add('border');

let leftTime = null;
let idInterval = null;
let selTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1, // start week on Monday
  },
  onClose(selectedDates) {
    const today = new Date().getTime();
    const selectedTime = selectedDates[0].getTime();
    selTime = selectedTime;
    if (selectedTime - today > 0) {
      startBtn.removeAttribute('disabled');
      leftTime = selectedTime - today;
      Notiflix.Report.success(
        'CORRECT DATE',
        '"Now time will pass ;)"',
        'Okay'
      );
    } else {
      startBtn.setAttribute('disabled', '');
      Notiflix.Report.failure(
        'INCORRECT DATE',
        'Please choose a date in the future',
        'Okay'
      );
    }
  },
  onOpen() {
    input.classList.add('change');
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function musicStart() {
  const audio = new Audio('kahoot-song.mp3');
  audio.play();
}

try {
  calendar('#datetime-picker', options);
} catch (error) {
  console.log(error.message);
}

startBtn.addEventListener('click', e => {
  musicStart();
  startBtn.setAttribute('disabled', '');
  resetBtn.removeAttribute('disabled');
  input.classList.remove('change');
  if (idInterval) {
    clearInterval(idInterval);
  }
  const today = new Date().getTime();

  let currentLeftTime = selTime - today;

  idInterval = setInterval(() => {
    const convertedTime = convertMs(currentLeftTime);

    days.textContent = addLeadingZero(convertedTime.days);
    hours.textContent = addLeadingZero(convertedTime.hours);
    minutes.textContent = addLeadingZero(convertedTime.minutes);
    seconds.textContent = addLeadingZero(convertedTime.seconds);

    currentLeftTime = currentLeftTime - 1000;

    if (currentLeftTime <= 0) {
      startBtn.setAttribute('disabled', '');
      clearInterval(idInterval);
    }
  }, 1000);
});
resetBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  clearInterval(idInterval);
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
});
