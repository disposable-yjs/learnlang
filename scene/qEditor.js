const game = require("../js/game");
const $ = require("jquery");
module.exports =exports = new (require("../js/sceneManager").DomScene)();
exports.on("start",(scene)=>{
  scene.elem.html(require("./qEditor.html")).find("#goto a").on("click",function(e){
    e.preventDefault();
    game.sceneManager.getScene(scene.elem.find("#goto input").val())[this.hash.replace("#","")]();
  });
  
});






