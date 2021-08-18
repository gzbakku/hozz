const engine = require('./engine/index');

global.common = require('./common');
global.cmd = require('./command');
global.io = require('./io');
global.input = require('input');
global.generate_keys = engine.keys.generate.init;

init();

async function init(){

  const apis = ['init','serve','keys','generate','docker','secure','update'];

  const work = process.argv;
  const location = work[1];
  let func = work[2];

  if(!location || typeof(func) !== "string" || apis.indexOf(func) < 0){
    func = await input.select("please select a valid api",apis);
  }

  if(apis.indexOf(func) >= 0){
    if(func == 'serve'){
      return engine.serve.init(work[3],work[4]);
    }
    if(func == 'init'){
      return engine.init.init(work[3],location);
    }
    if(func == 'keys'){
      return engine.keys.init(work[3],work[4]);
    }
    if(func == 'generate'){
      return engine.generate.init(work[3]);
    }
    if(func == 'generate'){
      return engine.generate.init(work[3]);
    }
    if(func == 'docker'){
      return engine.docker.init(work[3]);
    }
    if(func == 'secure'){
      return engine.secure.init(work[3],work[4]);
    }
    if(func == 'update'){
      return engine.update.init(work[3]);
    }
    if(func == 'founder'){
      common.success('Akku - Tejasav Dutt, you can found me at gzbakku@gmail.com');
      return;
    }
  }

  if(bank.indexOf(func) < 0){
    common.error('invalid argument');
    common.tag('vegana cli can do the following things :-');
    common.tag('- init');
    common.tag('- generate');
    common.tag('- serve');
    common.tag('- keys');
    common.tag('- docker');
    common.tag('- secure');
    common.tag('- update');
    common.tag('- founder');
    return;
  }

  common.error('unhandled_error');

}
