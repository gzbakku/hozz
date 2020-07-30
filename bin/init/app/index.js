global.engine.io = require('./io/index');
global.engine.elective = require('./elective/index');

const resp = require('./resp');

global.engine.resp = resp;
global.engine.appy = resp;

const wett_keys = require('./secure/wett_keys.json');
const app_controller = require('./apps/index');

async function init(){

  //add your own global objects here

  //any custom global functions should be declared in elective and used with engine.eletive

  //please decalre all db io in seprately in io directory so in future if you want to change your db, it will be a smooth process.

  //all wett global properties initiate here before apis are initiated

  engine.auth.loadKeys(wett_keys.private,wett_keys.public);
  await engine.server.init(process.env.PORT || 8080,true,'50mb');
  app_controller.init();

}


module.exports = {
  init:init
};
