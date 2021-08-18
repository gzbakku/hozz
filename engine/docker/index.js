

module.exports = {init:init};

const build = require("./build");
const config = require("./config");
const run = require("./run");
const start = require("./start");

async function init(func){

    global.docker = require("dockerode");

    let apis = ['build','run','config','start'];

    if(!func || typeof(func) !== "string" || apis.indexOf(func) < 0){
        func = await input.select("please select a valid api",apis);
    }

    if(func === "config"){
        config.init();
    } else if(func === "build"){
        build.init();
    } else if(func === "run"){
        run.init();
    } else if(func === "start"){
        start.init();
    }

}