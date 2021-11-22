(function () {
   let timerStart = Date.now();
   let timerEnd = Date.now();
   window.onload = function(){
      timerEnd = Date.now();
      document.getElementById("LoadTime").textContent = timerEnd - timerStart;
   };
  })();
  