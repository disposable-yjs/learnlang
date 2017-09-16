const EventEmitter=require("eventemitter2").EventEmitter2;
const pixi = require("pixi.js");
const app = require("./game").app;
const $ = require("jquery");
module.exports.SceneManager = class {
  constructor(){
    this._scene ={};
  }
  addScene(sceneName,scene,forceReAdd=false){
    if(!(scene instanceof exports.BaseScene)){
      throw new TypeError("This is not a Scene Object.");
      return;
    }
    if(this._scene[sceneName]&&!forceReAdd){
      throw new Error(sceneName+" already exists.");
    }
    this._scene[sceneName]=scene;
    scene.manager=this;
    scene.name=sceneName;
  }
  getScene(sceneName){
    return this._scene[sceneName];
  }
  removeScene(name){
    this._scene[name]=null;
  }
  hideOthers(nameNotToHide){
    for(let sceneName in this._scene){
      if (sceneName!==nameNotToHide) {
        if(this._scene[sceneName].alive){
          this._scene[sceneName]._hide();
        }
      }
    }
  }
};
exports.BaseScene = class extends EventEmitter{
  constructor(sceneFn){
    super();
    this.refresh()
    this.manager=null;
  }
  refresh(){
    this.name="";
    this.alive=false;
    this.visible=false;
    return this
  }
  start(...arg){
    if (!this.manager) {
      throw new Error("This scene isn't on SceneManager.");
    }
    this.visible=true;
    this.alive=true;
    this.emit("start",this,...arg);
    this.show();
    return this
  }
  show(){
    if(!this.alive){
      throw new Error("This scene is dead.");
    }
    this.visible=true;
    this.manager.hideOthers(this.name);
    return this
  }
  _hide(){ //private
    if(!this.alive){
      throw new Error("This scene is dead.");
    }
    this.visible=false;
  }
  destroy(){
    if(!this.alive){
      throw new Error("This scene is dead.");
    }
    this.alive=false;
  }
};
exports.Scene = class extends exports.BaseScene{
  constructor(){
    super();
    this.refresh()
    
  }
  refresh(){
    super.refresh();
    this.container=new pixi.Container();
    this.ticker=new pixi.ticker.Ticker();
    return this
  }
  start(...arg){
    app.stage.addChild(this.container);
    this.ticker.start();
    super.start(...arg);
    return this
  }
  show(){
    $("#canvasContainer").show();
    $("#domSceneContainer").hide();
    super.show();
    this.container.visible=true;
    return this
  }
  _hide(){ //private
    super._hide();
    this.container.visible=false;
  }
  destroy(){
    super.destroy();
    this.ticker.destroy();
    this.container.destroy();
    return this
  }
};
exports.DomScene = class extends exports.BaseScene{
  constructor(){
    super();
    this.refresh()
  }
  refresh(){
    super.refresh()
    this.elem=$("<div>");
    return this
  }
  start(...arg){
    this.elem.attr("data-scene",this.name);
    $("#domSceneContainer").append(this.elem);
    super.start(...arg);
    return this
  }
  show(){
    $("#canvasContainer").hide();
    $("#domSceneContainer").show();
    super.show();
    this.elem.show()
  }
  _hide(){ //private
    super._hide();
    this.elem.hide()
  }
  destroy(){
    super.destroy();
  }
};
