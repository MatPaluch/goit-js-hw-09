const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("BODY");let d=null;e.setAttribute("disabled",""),t.addEventListener("click",a=>{t.setAttribute("disabled",""),e.removeAttribute("disabled"),d=setInterval(()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`},500)}),e.addEventListener("click",r=>{t.removeAttribute("disabled"),e.setAttribute("disabled",""),clearInterval(d)});
//# sourceMappingURL=01-color-switcher.1e205656.js.map
