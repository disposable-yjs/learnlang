const game = require("../js/game");
const $ = require("jquery");

const storage = require("../js/storage")

module.exports =exports = new (require("../js/sceneManager").DomScene)();
exports.on("start",(scene)=>{
  const stageList=scene.elem.html(require("./stage.html")).find("#stageList")
  const lst=storage.get("stageList")||{}
  function createList(){
    let htm=``
    for(let v in lst){
      htm+=`<div class="stage" data-name="${v}"><a class="label">${v}</a><div class="info"></div><div class="remove"></div></div>`
    }
    stageList.html(htm)
  }
  createList()
  stageList.on("click",".stage a.label",(e)=>{
    e.preventDefault()
    game.sceneManager.getScene("play").start(lst[$(e.target).parent().attr("data-name")].questions)
  })
  stageList.on("click",".stage .info",(e)=>{
    e.preventDefault()
    game.sceneManager.getScene("stageInfo").start(lst[$(e.target).parent().attr("data-name")])
  })
  stageList.on("click",".stage .remove",(e)=>{
    e.preventDefault()
    delete lst[$(e.target).parent().attr("data-name")]
    storage.set("stageList",lst)
    createList()
  })
  const addStage=scene.elem.find("#addStage")
  addStage.find("#addBtn").on("click",(e)=>{
    e.preventDefault()

    if(addStage.find("#json").val()){
      let jsn=JSON.parse(addStage.find("#json").val())
      lst[jsn.name]=jsn
      storage.set("stageList",lst)
      createList()
      return
    }
    const file = addStage.find("#file")[0].files[0]
    const reader = new FileReader()

    reader.onload =()=>{
      let jsn=JSON.parse(reader.result)
      lst[jsn.name]=jsn
      storage.set("stageList",lst)
      createList()
    }
    reader.readAsText(file)
    
    
  })
})
