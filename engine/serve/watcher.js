const chokidar = require('chokidar');

module.exports = {

  init:(cwd)=>{

    chokidar.watch(cwd)
    .on('change',async (path)=>{
      common.tell("restarting / hozzifying");
      restart();
    });

    process.stdin.on("data",(key)=>{
      common.tell("restarting / hozzifying");
      restart();
    });

  }

}
