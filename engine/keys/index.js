
const generate = require('./generate');
const check = require('./check');

module.exports = {

  generate:generate,

  init:async (todo,size)=>{

    while(true){
      size = await input.text("please provide a rsa key size from 256 and above.",{
        default:"512"
      });
      size = Number(size);
      if(size < 512){
        common.error("rsa key size cannot be less then 512");
      } else {
        break;
      }
    }

    if(todo !== "generate" && todo !== "remake"){
      todo = await input.select("please select a valid api",['generate','remake']);
    }

    if(todo === "generate"){
      const do_check = await check.init();
      if(!do_check){
        return common.error("failed-check_keys_file");
      }
    }

    await generate.init(size);

  }

};
