require("../css/index.scss").ref();
require("./game.js");
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('dist/serviceWorker.js');
  }
});
