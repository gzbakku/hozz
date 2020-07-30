const app = require('./app');
const api = require('./api');
const method = require('./method');

module.exports = {

  init:async ()=>{

    // return method.init();


    const type = await input.select("module type",['app','api','method']);
    if(type === "app"){
      return app.init();
    }
    if(type === "api"){
      return api.init();
    }
    if(type === "method"){
      return method.init();
    }
  }

};
