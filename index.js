const engine = require('./engine/index');

global.common = require('./common');
global.cmd = require('./command');
global.io = require('./io');
global.input = require('input');
global.generate_keys = engine.keys.generate.init;

init();

function init(){

  const bank = ['init','serve','keys','generate'];
  const work = process.argv;
  const location = work[1];
  const func = work[2];

  if(bank.indexOf(func) >= 0){
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
    common.tag('- founder');
    return;
  }

  common.error('unhandled_error');

}
