document.querySelector(".form").addEventListener("submit",e=>{e.preventDefault();let t=e.target.elements,o=t.delay.value,l=t.step.value,n=t.amount.value;for(let e=1;e<=n;e++)(function(e,t){return new Promise((o,l)=>{setTimeout(()=>{Math.random()>.3?o({position:e,delay:t}):l({position:e,delay:t})},t)})})(e,o).then(({position:e,delaySuc:t})=>{console.log(`\u{2705} Fulfilled promise ${e} in ${t}ms`)}).catch(({position:e,delayEr:t})=>{console.log(`\u{274C} Rejected promise ${e} in ${t}ms`)}),o+=l});
//# sourceMappingURL=03-promises.7e72441c.js.map
