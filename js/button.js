const pixi = require("pixi.js");

class Button {
  constructor(option,callback){
    this.option = option;
    
    this.callback = callback;
    const bCont =this.button= new pixi.Graphics()
    
    const label= this.label=  new pixi.Text(option.label,{
      dropShadow:true,
      dropShadowBlur:2,
      dropShadowDistance:3,
      fill:"white",
      fontSize:option.fontSize||option.height-5
    })
    bCont.addChild(label)

    bCont.beginFill(option.fill,1)
    bCont.drawRoundedRect(0,0,option.width||label.width+5,option.height||label.height+5,8)
    bCont.endFill()

    label.x=bCont.width/2-label.width/2
    label.y=bCont.height/2-label.height/2

    bCont.buttonMode=true
    bCont.interactive=true

    bCont.on("pointerup",this.callback)
  }
  add(parent){
    //parent must be PIXI.displayObject and be able to have child

    parent.addChild(this.button)
    this.button.x=this.option.x
    this.button.y=this.option.y
  }
}

module.exports = Button
