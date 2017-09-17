const game = require("../js/game");
const $ = require("jquery");

const storage = require("../js/storage")

module.exports =exports = new (require("../js/sceneManager").DomScene)();
exports.on("start",(scene,stage)=>{
  const stageInfo=scene.elem.html(require("./stageInfo.html"))
  stageInfo.find("#title").text(stage.name);
  stageInfo.find("#author").text(stage.author)
  stageInfo.find("#description").text(stage.description)
  stageInfo.find("#qNum").text(stage.questions.length)
  scene.elem.find("#back").on("click",()=>{
    game.sceneManager.getScene("stage").show()
  })
})



















