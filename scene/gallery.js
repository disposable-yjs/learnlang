const game = require("../js/game");
const $ = require("jquery");

const storage = require("../js/storage")

module.exports =exports = new (require("../js/sceneManager").DomScene)();
exports.on("start",(scene)=>{
  const gl=scene.elem.html(require("./gallery.html")).find("#galleryList")
  let html ="";
  window.fetch("https://勉強.ga/learnlang/res/galleryList.json",{
    mode:"cors"
  }).then(req=>req.json()).then(galleryList=>{
    galleryList.items.forEach((v,i)=>{
    if((storage.get("score")|0)<v.score){
      return
    }
    html+=`
<div class="galleryItem" data-href="${v.url}" style="background-image:url(${v.thumbnail})">
  <div class="info">
    <div class="name">${v.name}</div>
    <div class="description">${v.description}</div>
  </div>
</div>`
  })
    gl.html(html);
  })
  scene.elem.find("#back").on("click",()=>{
    game.sceneManager.getScene("result").show()
  })
  scene.elem.on("click",".galleryItem",function(){
    game.sceneManager.getScene("galleryImage").start($(this).attr("data-href")).show()
  })  
});
