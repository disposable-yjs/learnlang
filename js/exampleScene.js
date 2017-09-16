const pixi = require("pixi.js");

module.exports =exports = new (require("./sceneManager").Scene)();
exports.on("start",(scene)=>{
  const text = new pixi.Text("TEXT");
  scene.container.addChild(text);
  scene.ticker.add(()=>{
    text.text=scene.ticker.FPS;
  });
});
exports.start();
