const watcher = require('./watcher');

module.exports = {

  init:async (cwd)=>{

    if(!cwd){cwd = io.dir.cwd();}

    const index = cwd + "/index.js";

    let hold = await cmd.child("node",[index]);
    let started = false;

    let restarting = false;
    global.restart = async ()=>{
      if(restarting){return true;} else {restarting = true;}
      if(started){return true;}
      started = true;
      await hold.close();
      hold = await cmd.child("node",[index]);
      started = false;
      restarting = false;
    };

    watcher.init(cwd);

  }

};
