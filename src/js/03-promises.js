const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target.elements;
  let delay = form.delay.value;
  const step = form.step.value;
  const amount = form.amount.value;

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delaySuc }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delaySuc}ms`);
      })
      .catch(({ position, delayEr }) => {
        console.log(`❌ Rejected promise ${position} in ${delayEr}ms`);
      });
    delay = delay + step;
  }
});
