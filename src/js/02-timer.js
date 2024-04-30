import calendar from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_blue.css');
import Notiflix from 'notiflix';

const flatpickr = require('flatpickr');
const startBtn = document.querySelector('[data-start]');
const resetBtn = document.querySelector('[data-stop]');
const audioKahoot = document.querySelector('[data-kahoot]');
const audioBell = document.querySelector('[data-bell]');
const pedro = document.querySelector('[data-pedro]');
const pedroGif = document.querySelector('.pedro');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');
input.classList.add('border');

let idInterval = null;
let selectedTime = null;

const losu = ['tada.mp3', 'ricky.mp3', 'money.mp3', 'taco_bell.mp3'];

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
    selectedTime = selectedDates[0].getTime();
    const leftTime = selectedTime - today;
    if (leftTime > 0) {
      startBtn.removeAttribute('disabled');
      input.classList.toggle('change');
      input.classList.add('correct');
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
    input.classList.toggle('change');
  },
  onOpen() {
    input.classList.toggle('change');
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1;
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

// In browsers that don’t yet support this functionality,
// playPromise won’t be defined.

try {
  calendar('#datetime-picker', options);
} catch (error) {
  console.log(error.message);
}

startBtn.addEventListener('click', e => {
  input.classList.remove('change');
  input.classList.remove('correct');
  startBtn.setAttribute('disabled', '');
  resetBtn.removeAttribute('disabled');

  if (idInterval) {
    clearInterval(idInterval);
  }

  const today = new Date().getTime();
  let currentLeftTime = selectedTime - today;

  currentLeftTime = Math.round(currentLeftTime / 1000);
  console.log(currentLeftTime);

  if (currentLeftTime > 0) {
    if (currentLeftTime < 42) {
      pedro.currentTime = 41 - currentLeftTime;
      pedro.play();
      pedroGif.classList.toggle('hidden');
    }

    idInterval = setInterval(() => {
      console.log(currentLeftTime);
      if (currentLeftTime === 42) {
        pedro.play();
        pedroGif.classList.toggle('hidden');
      }

      const convertedTime = convertMs(currentLeftTime);

      days.textContent = addLeadingZero(convertedTime.days);
      hours.textContent = addLeadingZero(convertedTime.hours);
      minutes.textContent = addLeadingZero(convertedTime.minutes);
      seconds.textContent = addLeadingZero(convertedTime.seconds);

      if (currentLeftTime === 0) {
        //audioBell.play();
        resetBtn.setAttribute('disabled', '');
        startBtn.setAttribute('disabled', '');
        pedroGif.classList.add('bum');
        clearInterval(idInterval);
        setTimeout(() => pedroGif.classList.add('hidden'), 80000);
      }

      currentLeftTime -= 1;
    }, 1000);
  } else {
    Notiflix.Report.failure(
      'TIME OUT',
      'Please choose a date in the future',
      'Okay'
    );
  }
});

resetBtn.addEventListener('click', () => {
  if (selectedTime > new Date().getTime()) {
    startBtn.removeAttribute('disabled');
  }
  pedroGif.classList.add('hidden');
  pedro.pause();
  resetBtn.setAttribute('disabled', '');
  clearInterval(idInterval);

  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
});
