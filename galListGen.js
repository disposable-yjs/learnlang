const inquirer = require("inquirer")
const fs = require("fs");
const path = require("path")
var easyimg = require('easyimage');

const out={items:[]}

function query(){
  inquirer.prompt([{
    type:"input",
    name:"path",
    message:"Jpeg Photo path to add",
  },{
    type:"input",
    name:"name",
     message:"Name of this photo",
  },{
    type:"input",
    name:"score",
    message:"Score",
  },{
    type:"input",
    name:"desc",
    message:"description"
    
  },{
    type:"confirm",
    name:"more",
    message:"Add more?",
    default:true
  }]).then((ans)=>{
    let filename=(Math.random()*1000000)|0
    fs.renameSync(ans.path,path.join(__dirname,"res","gallery",filename+".jpg"))
    easyimg.resize({
      src:ans.path,
      dst:path.join(__dirname,"res","gallery",filename+".sm.jpg"),
      width:600
    }, function(err, image) {
      if (err) throw err;
      console.log('RSZD '+path.join(__dirname,"res","gallery",filename+".sm.jpg")+ image.width + ' x ' + image.height);
    });
    out.items.push({
      url:"https://勉強.ga/learnlang/res/gallery/"+filename+".jpg",
      thumbnail:"https://勉強.ga/learnlang/res/gallery/"+filename+".sm.jpg",
      name:ans.name,
      score:ans.score|0,
      description:ans.desc
    })
    fs.writeFileSync(path.join(__dirname,"res","galleryList.json"),JSON.stringify(out),"utf8")
    if(ans.more){
      query()
    }else{
      console.info("Bye.");
      process.exit(0)
    }
  })
}
query()
