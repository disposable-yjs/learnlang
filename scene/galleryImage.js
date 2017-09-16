const game = require("../js/game");
const $ = require("jquery");

const storage = require("../js/storage")

module.exports =exports = new (require("../js/sceneManager").DomScene)();
exports.on("start",(scene,filename)=>{
  const gl=scene.elem.html(require("./galleryImage.html")).find("#gImgArea")
  gl.css({
    'background-image':'url('+filename+')'
  })
  scene.elem.find("#back").on("click",()=>{
    game.sceneManager.getScene("gallery").show()
  })
  scene.elem.find("#setBackground").on("click",()=>{
    storage.set("background",filename)
  })
});
