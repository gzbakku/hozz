const chokidar = require('chokidar');

module.exports = {

  init:(cwd)=>{
    chokidar.watch(cwd)
    .on('change',async (path)=>{
      common.tell("restarting / hozzifying");
      restart();
    });
  }

}
