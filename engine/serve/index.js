const watcher = require('./watcher');

module.exports = {

  init:async (cwd)=>{

    if(!cwd){cwd = io.dir.cwd();}

    const index = cwd + "/index.js";

    let hold = await cmd.child("node",[index]);
    let started = false;

    global.restart = async ()=>{
      if(started){return true;}
      started = true;
      await hold.close();
      hold = await cmd.child("node",[index]);
      started = false;
    };

    watcher.init(cwd);

  }

};
