!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("BODY"),n=null;e.setAttribute("disabled",""),t.addEventListener("click",(function(a){t.setAttribute("disabled",""),e.removeAttribute("disabled"),n=setInterval((function(){r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),500)})),e.addEventListener("click",(function(r){t.removeAttribute("disabled"),e.setAttribute("disabled",""),clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.98419c99.js.map
