
const generate = require('./generate');
const check = require('./check');

module.exports = {

  init:async (todo,size)=>{

    if(!size || isNaN(size)){
      size = 512;
    }

    if(todo !== "generate" && todo !== "remake"){
      return common.error("please provide a valid key action of generate or remake");
    }

    if(todo === "generate"){
      const do_check = await check.init();
      if(!do_check){
        return common.error("failed-check_keys_file");
      }
    }

    generate.init(size);

  }

};
