const pixi = require("pixi.js");
const game = require("../js/game");
const RichText=require('pixi-richtext').default;
const storage = require("../js/storage")

const vWidth = game.app.renderer.width;
const vHeight = game.app.renderer.height;
const portrait = vWidth<=vHeight;
const landscape = vWidth>vHeight;

const fontScale = vWidth/300
module.exports =exports = new (require("../js/sceneManager").Scene)();
exports.on("start",(sce,res)=>{
  let startDate=Date.now();
  let statusBarWidth=0,statusBarHeight=0;

  sce.lastData=res

  let backgroundImage =pixi.Sprite.fromImage(storage.get("background"));
  backgroundImage.anchor.set(0.5);
  backgroundImage.x=vWidth/2;
  backgroundImage.y=vHeight/2;
  sce.container.addChild(backgroundImage)
  
  
  let statusBar= new pixi.Container();
  sce.container.addChild(statusBar);
  statusBar.x=0;
  statusBar.y=0;
   statusBarHeight=statusBar.height=vHeight*0.03;
  if(portrait){
    statusBarWidth=statusBar.width=vWidth;
  }else{
    statusBarWidth=statusBar.width=vWidth*0.4;
  }
  
  let statusBarBg=new pixi.Graphics();
  statusBarBg.beginFill(0xd6e4ff, 1);
  statusBarBg.alpha=0.9
  //statusBar.blendMode=pixi.BLEND_MODES.MULTIPLY
  statusBarBg.drawRect(0, 0,statusBarWidth,vWidth*0.5);
  statusBarBg.endFill();
  statusBar.addChild(statusBarBg);

  let timeText = new pixi.Text("00:00",{fontSize:statusBarHeight});
  statusBar.addChild(timeText);
  sce.ticker.add(()=>{
    let diff=(Date.now()-startDate)/1000;
    timeText.text=(((diff/60)|0)+":"+("0"+((diff%60)|0)).slice(-2));
  });

  let qTextContainer = sce.qTextContainer=new pixi.Container();
  sce.container.addChild(qTextContainer);
  qTextContainer.x=0;
  qTextContainer.y=statusBarHeight;
  qTextContainer.width=statusBarWidth;
  if(landscape){
    qTextContainer.height=vHeight*0.98;
  }else{
    qTextContainer.height=vHeight*0.4;
  }

  
  sce.qText= new RichText("",{
    fontSize:statusBarWidth/20,
    layout:{
      gridSize:statusBarWidth/20,
      column:25,
      xInterval:-2,
      yInterval:3,
      letterSpacing:0
  }
  });
  qTextContainer.addChild(sce.qText);

  let qcWidth=0,qcHeight=0;
  var qContainer = sce.qContainer =  new pixi.Container();
  sce.container.addChild(qContainer);
  if(portrait){
    qContainer.x = 0;
    qContainer.y = vHeight*0.42;
    qcWidth=qContainer.width=vWidth;
    qcHeight=qContainer.height=vHeight*0.58;
  }else{
    qContainer.x = statusBarWidth;
    qContainer.y = 0;
    qcWidth=qContainer.width=vWidth-statusBarWidth;
    qcHeight=qContainer.height=vHeight;
  }
  sce.choiceAreaList =[];
  for (let i = 0; i < 9; i++) {
    let qItm = new pixi.Container();
    let qBtnBk = new pixi.Graphics();
    let bw =qcWidth/3;
    let bh= qcHeight/3;
    qBtnBk.beginFill(0xFFade1, 1);
    qBtnBk.drawRoundedRect(10, 10, bw-10, bh-10,30);
    qBtnBk.endFill();  
    
    qItm.x=(i%3)*(bw);
    qItm.y=((i/3)|0)*(bh);
    
    qItm.width=bw;
    qItm.height=bh;
    
    qItm.addChild(qBtnBk);
    
    let qChoiceText=sce.qChoiceText = new pixi.Text(
      "",
      {
        wordWrap:true,
        wordWrapWidth:bw,
        breakWords:true,
        fontSize:(bw*bh/3072)|0
      }
    );
    qChoiceText.anchor.set(0.5,0.5);
    qChoiceText.x=bw/2;
    qChoiceText.y=bh/2;
    
    qItm.addChild(qChoiceText);
    if(true){//button click mode
      qItm.interactive=true;
      qItm.on("pointerdown",function(){
        sce.questionCallback(i,sce.choiceAreaList[i].correct);
      });
    }
    
    qContainer.addChild(qItm);
    sce.choiceAreaList.push({
      qItm,qBtnBk,qChoiceText,
      text:"",
      correct:false
    })
  }

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
  
});
exports.setQuestion=(opts,cb,sce)=>{
  sce.questionCallback=cb
  sce.qText.text=opts.questionText

  for (let i = 0; i < 9; i++) {
    const current  = sce.choiceAreaList[i]
    current.qChoiceText.text=current.text=
      (opts.onlyCorrect&&opts.choiceList[i]!=opts.correct)?"":opts.choiceList[i];
    current.correct=opts.choiceList[i]==opts.correct;

  }
 
};
