const engine = require('./engine/index');

global.common = require('./common');
global.cmd = require('./cmd');
global.io = require('./io');

init();

function init(){

  const bank = ['init','serve'];
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
    if(func == 'founder'){
      common.success('Akku - Tejasav Dutt, you can found me at gzbakku@gmail.com');
      return;
    }
  }

  if(bank.indexOf(func) < 0){
    common.error('invalid argument');
    common.tag('vegana cli can do the following things :-');
    common.tag('- init');
    common.tag('- serve');
    common.tag('- founder');
    return;
  }

  common.error('unhandled_error');

}
