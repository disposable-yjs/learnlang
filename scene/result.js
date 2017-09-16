const pixi = require("pixi.js");
const learn = require("../js/param")
const game = require("../js/game");
const app = game.app
const storage = require("../js/storage")

module.exports =exports = new (require("../js/sceneManager").Scene)();
exports.on("start",(sce,correctCount,second)=>{
  let scoreBk=new pixi.Graphics();
  scoreBk.beginFill(0x5d3008,1);
  scoreBk.drawRect(learn.scoreBkMargin,learn.scoreBkMargin,app.renderer.width-2*learn.scoreBkMargin,app.renderer.height-2*learn.scoreBkMargin);
  scoreBk.endFill();
  sce.container.addChild(scoreBk);
  const thisScore=(correctCount*correctCount*5/second)|0;
  const total=(storage.get("score")|0)+thisScore;
  storage.set("score",total);
  let tTime=0,tAns=0,tScore=0,tTS=0;
  
  let scoreText=new pixi.Text(
    `Time:
Answered:

Score:
Total Score:
`,{wordWrap:true,wordWrapWidth:app.renderer.width-2*learn.scoreBkMargin,breakWords:true,fontSize:20*learn.fontScale,fill:0xffffff}
  );
  scoreText.x=learn.scoreBkMargin;
  scoreText.y=learn.scoreBkMargin;
  
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

  //buttons
  const re=new pixi.Text("Retry",{fill:0xffffff});
  re.x=100;re.y=400;
  let reBtn=new pixi.Graphics();
  reBtn.beginFill(0x008405,1);
  reBtn.drawRect(100,400,200,100);
  reBtn.endFill();
  sce.container.addChild(reBtn);
  reBtn.interactive = true;
  reBtn.on("pointerup",()=>{
    game.sceneManager.getScene("play").refresh()
    game.sceneManager.getScene("stage").start()
  });
  sce.container.addChild(re);
  const galBtn=new pixi.Text("Gallery");
  galBtn.x=100;galBtn.y=550;
  let galBtnBtn=new pixi.Graphics();
  galBtnBtn.beginFill(0xffed66,1);
  galBtnBtn.drawRect(100,550,200,100);
  galBtnBtn.endFill();
  sce.container.addChild(galBtnBtn);
  galBtnBtn.interactive = true;
  galBtnBtn.on("pointerup",()=>{
    game.sceneManager.getScene("gallery").start().show()
  });
  sce.container.addChild(galBtn);
});
