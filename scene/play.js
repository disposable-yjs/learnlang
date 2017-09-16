const pixi = require("pixi.js");
const game = require("../js/game");
const app = game.app
const learn = require("../js/param")

module.exports =exports = new (require("../js/sceneManager").Scene)();
exports.on("start",(sce,res)=>{
  let startDate=Date.now();

  let answeredCount=0;
  (function loop(){
    let i=(Math.random()*res.length)|0;
    let cor=res[i].answer[0];
    let choiceList=[];
    let corIndex = (Math.random()*9)|0;
    for(let ind =0;ind<9;ind++){
      if(ind==corIndex){
        choiceList.push(cor);
      }else{
        choiceList.push(res[(Math.random()*res.length)|0].answer[0]);
      }
    }
    
    exports.setQuestion({
      choiceList:choiceList,
      correct:cor,
      questionText:res[i].question
    },(index,isCorrect)=>{
      console.log(index,isCorrect);
      if (!isCorrect) {
        exports.setQuestion({
          choiceList,
          correct:cor,
          questionText:"ぶっぶーｗｗｗｗｗ",
          onlyCorrect:true
        },()=>{},sce);
        setTimeout(()=>{
          game.sceneManager.getScene("result").start(answeredCount,((Date.now()-startDate)/1000)|0)
          sce.destroy();
        },1000);
        return;
      }
      answeredCount++;
      loop();
    },sce);
  }).call(this);

  let statusBar= new pixi.Container();
  sce.container.addChild(statusBar);
  statusBar.width=app.renderer.width;
  statusBar.height=30;
  statusBar.pivot.x=0;
  statusBar.pivot.y=statusBar.height;
  statusBar.x=0;
  statusBar.y=app.renderer.height-30;
  
  let statusBarBk=new pixi.Graphics();
  statusBarBk.beginFill(0xc6e4ff, 1);
  statusBarBk.drawRect(0, 0,app.renderer.width,100);
  statusBarBk.endFill();
  statusBar.addChild(statusBarBk);

  let timeText = new pixi.Text("00:00",{fill:learn.textColor,fontSize:16*learn.fontScale});
  statusBar.addChild(timeText);
  sce.ticker.add(()=>{
    let diff=(Date.now()-startDate)/1000;
    timeText.text=(((diff/60)|0)+":"+("0"+((diff%60)|0)).slice(-2));
  });
});
exports.setQuestion=(opts,cb,sce)=>{
  var qContainer = new pixi.Container();
  sce.container.addChild(qContainer);
  
  let qTextContainer = new pixi.Container();
  sce.container.addChild(qTextContainer);
  qTextContainer.x=0;
  qTextContainer.y=0;
  let qTextBk = new pixi.Graphics();
  qTextBk.beginFill(0xc6e4ff, 1);
  qTextBk.drawRect(0, 0,app.renderer.width,55);
  qTextBk.endFill();
  qTextContainer.addChild(qTextBk);

  let qText= new pixi.Text(opts.questionText,{wordWrap:true,wordWrapWidth:app.renderer.width,breakWords: true,fontSize:17*learn.fontScale});
  qText.anchor.set(0,0);
  qText.y=1;
  qTextContainer.addChild(qText);

  for (let i = 0; i < 9; i++) {
    if(!opts.choiceList[i]){
      continue;
    }
    let qItm = new pixi.Container();
    let qBtnBk = new pixi.Graphics();
    
    qBtnBk.beginFill(0xFFade1, 1);
    qBtnBk.drawRect(0, 0, learn.blockWidth, learn.blockHeight);
    qBtnBk.endFill();  
    
    qItm.x=(i%3)*(learn.blockWidth+learn.blockPadding);
    qItm.y=((i/3)|0)*(learn.blockHeight+learn.blockPadding);
    
    qItm.width=learn.blockWidth;
    qItm.height=learn.blockHeight;
    
    qItm.addChild(qBtnBk);
    
    let qChoiceText = new pixi.Text((opts.onlyCorrect&&opts.choiceList[i]!=opts.correct)?"":opts.choiceList[i],{wordWrap:true,wordWrapWidth:learn.blockWidth,breakWords:true,fontSize:16*learn.fontScale,fill:learn.textColor});
    qChoiceText.anchor.set(0.5,0.5);
    qChoiceText.x=learn.blockWidth/2;
    qChoiceText.y=learn.blockHeight/2;
    
    qItm.addChild(qChoiceText);
    if(true){//button click mode
      qItm.interactive=true;
      qItm.on("pointerdown",function(){
        qContainer.destroy();
        cb&&cb(i,opts.choiceList[i]==opts.correct);
      });
    }
    
    qContainer.addChild(qItm);
  }
  qContainer.pivot.x=qContainer.width/2;
  qContainer.pivot.y=qContainer.height;
  qContainer.x = app.renderer.width/2;
  qContainer.y = app.renderer.height-50;

};
