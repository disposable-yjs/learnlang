const pixi = require("pixi.js");
const storage=require("./storage");
const $ = require("jquery");
const canvas = $("canvas#gameCanvas");
exports.app=new pixi.Application(window.innerWidth*2,window.innerHeight*2,{
  backgroundColor:0xffffff,
  view:canvas[0]
});
//canvas.css({
//  width:window.innerWidth,
//  height:window.innerHeight
//})
exports.sceneManager=new (require("./sceneManager.js").SceneManager)();

exports.sceneManager.addScene("start",require("../scene/start.js"));
exports.sceneManager.addScene("stage",require("../scene/stage.js"));
exports.sceneManager.addScene("play",require("../scene/play.js"));
exports.sceneManager.addScene("result",require("../scene/result.js"));
exports.sceneManager.addScene("gallery",require("../scene/gallery.js"));
exports.sceneManager.addScene("galleryImage",require("../scene/galleryImage.js"));

if (!storage.dev){
  exports.sceneManager.getScene("start").start();
}else if(storage.enableQEditor){
  exports.sceneManager.addScene("qEditor",require("../scene/qEditor.js"));
  exports.sceneManager.getScene("qEditor").start();
}else if(storage.skipStart){
  exports.sceneManager.getScene("play").start();
}















