const localStorage = window.localStorage || {getItem(){},setItem(){}};
exports.get=key=>JSON.parse(localStorage.getItem(key)||'""')
exports.set =(key,value)=>{

  localStorage.setItem(key,JSON.stringify(value))

};
exports.dev=false;
exports.skipStart=true;
//exports.enableQEditor=true;
