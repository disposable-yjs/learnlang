const pixi = require("pixi.js");
const game = require("../js/game");
const param = require("../js/param")

module.exports =exports = new (require("../js/sceneManager").Scene)();
exports.on("start",(scene)=>{
  const logo = new pixi.Sprite.fromImage("dist/logo.png");
  logo.scale.x=0.4*param.fontScale;
  logo.scale.y=0.4*param.fontScale;
  logo.anchor.set(0.5);
  logo.x=game.app.renderer.width/2;
  logo.y=game.app.renderer.height/2;
  scene.container.addChild(logo);

  const tapToStart = new pixi.Text("Tap Here",{fontSize:30*param.fontScale});
  tapToStart.anchor.set(0.5);
  tapToStart.x=game.app.renderer.width/2;
  tapToStart.y=game.app.renderer.height-80;
  scene.container.addChild(tapToStart);

  scene.ticker.add(()=>{
    let t=scene.ticker.lastTime*0.0005;
    tapToStart.y=game.app.renderer.height-80+(Math.sin(t)+Math.sin(4*t))*7;
  });

  scene.container.interactive=true;
  scene.container.buttonMode=true;
  scene.container.on("pointerdown",()=>{
    scene.ticker.add(()=>{
      scene.container.y-=scene.ticker.deltaTime*100+scene.container.y*0.07;
    });
    setTimeout(()=>{
      game.sceneManager.getScene("stage").start();
      scene.destroy();
    },1000);
    
  });
});

