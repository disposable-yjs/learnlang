const pixi = require("pixi.js");
const game = require("../js/game");
const app = game.app
const storage = require("../js/storage")
const Button = require("../js/button.js")

const vWidth = game.app.renderer.width;
const vHeight = game.app.renderer.height;
const portrait = vWidth<=vHeight;
const landscape = vWidth>vHeight;

const margin = 50

module.exports =exports = new (require("../js/sceneManager").Scene)();
exports.on("start",(sce,correctCount,second)=>{
  let scoreBk=new pixi.Graphics();
  scoreBk.beginFill(0x724f0a,1);
  scoreBk.drawRoundedRect(margin,margin,vWidth-2*margin,vHeight-2*margin,margin);
  scoreBk.endFill();
  sce.container.addChild(scoreBk);
  const thisScore=(correctCount*correctCount*5/second)|0;
  const total=(storage.get("score")|0)+thisScore;
  storage.set("score",total);
  let tTime=0,tAns=0,tScore=0,tTS=0;
  
  let scoreText=new pixi.Text("Result",{
    wordWrap:true,
    wordWrapWidth:vWidth-2*margin,
    breakWords:true,
    fontSize:vWidth/20,
    fill:0xffffff}
  );
  scoreText.x=2*margin;
  scoreText.y=2*margin;
  
  sce.container.addChild(scoreText);
  sce.ticker.add(()=>{
    tTime=(tTime<second)?tTime+1:second;
    tAns=(tAns<correctCount)?tAns+1:correctCount;
    tScore=(tScore<thisScore)?tScore+1:thisScore;
    tTS=(tTS<total)?tTS+1:total;
    scoreText.text=`Time:${tTime}
Answered:${tAns}

Score:${tScore}
Total Score:${tTS}

`;
    
  });
  const buttonWidth=500
  const buttonHeight=120;
  (new Button({
    label:"Back to Stage list",
    y:vHeight-3*(margin+buttonHeight),
    x:2*margin,
    width:buttonWidth,
    height:buttonHeight,
    fill: 0x048bcc,
    fontSize:60
  },()=>{
    game.sceneManager.getScene("play").refresh()
    game.sceneManager.getScene("stage").start()
  })).add(sce.container);
  (new Button({
    label:"Retry",
    y:vHeight-2*(margin+buttonHeight),
    x:2*margin,
    width:buttonWidth,
    height:buttonHeight,
    fill: 0x50d38f,
    fontSize:60
  },()=>{
    const data = game.sceneManager.getScene("play").lastData;
    game.sceneManager.getScene("play").refresh()
    game.sceneManager.getScene("play").start(data)
  })).add(sce.container); 

  (new Button({
    label:"Gallery",
    y:vHeight-margin-buttonHeight,x:2*margin,
    width:buttonWidth,
    height:buttonHeight,
    fill:0xc18b15,
    fontSize:60
  },()=>{
    game.sceneManager.getScene("gallery").start().show()
  })).add(sce.container)

});
