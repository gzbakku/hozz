global.engine.io = require('./io/index');
global.engine.elective = require('./elective/index');

const resp = require('./resp');

global.engine.resp = resp;
global.engine.appy = resp;

const app_controller = require('./apps/index');
const websocket_controller = require('./websocket.js');
const server_controller = require('./server.js');
const auth_controller = require('./auth.js');

async function init(){

  //add your own global objects here

  //any custom global functions should be declared in elective and used with engine.eletive

  //please decalre all db io in seprately in io directory so in future if you want to change your db, it will be a smooth process.

  //all wett global properties initiate here before apis are initiated

  //---------------------------
  //start controllers
  //---------------------------

  app_controller.init();
  websocket_controller.init();
  auth_controller.init();
  server_controller.init();

}


module.exports = {
  init:init
};
