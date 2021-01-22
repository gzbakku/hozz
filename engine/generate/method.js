

module.exports = {

  init:async ()=>{

    const cwd = io.dir.cwd();

    //************************
    //select app

    const appsDir = cwd + "/app/apps"
    const apps = await io.dir.subDir(appsDir);
    if(apps === false){
      return common.error("failed-get-app_directories");
    }
    if(apps.length === 0){
      return common.error("please add atleast one app to make a api");
    }
    let app = 'akku';
    if(true){
      if(apps.length === 1){
        common.tell("only one app found : " + apps[0]);
        app = apps[0];
      } else {
        app = await input.select("choose app",apps);
      }
    }
    const appDir = appsDir + "/" + app;

    //************************
    //select api

    const apis = await io.dir.subDir(appDir);
    if(apis === false){
      return common.error("failed-get-apis_directories");
    }
    if(apis.length === 0){
      return common.error("please add atleast one api to make a method");
    }
    let api = 'akku';
    if(true){
      if(apis.length === 1){
        common.tell("only one api found : " + apis[0]);
        api = apis[0];
      } else {
        api = await input.select("choose api",apis);
      }
    }
    const apiDir = appDir + "/" + api;

    //************************
    //select method

    const methods = ['get','set','submit','update','list','search','delete','custom'];
    let method = await input.select("choose app",methods);
    if(method === "custom"){
      method = await input.text('custom method name');
    }
    if(method.length === 0){
      return common.error("invalid method name length");
    }
    const methodPath = apiDir + "/" + method + ".js"
    const methodLocation = "/apps/" + app + "/" + api + "/" + method;

    if(await io.exists(methodPath)){
      return common.error("method with this name already exists in this api");
    }

    //*************************
    //copy method file

    const bin = io.dir.app();
    const engine = bin + "/generate/method_engine.js";

    const copy = await io.copy(engine,methodPath);
    if(!copy){
      return common.error("failed-generate-method_engine-file");
    }

    //*************************
    //customize method file

    let readMethod = await io.read(methodPath);
    if(!readMethod){
      return common.error("failed-read-method_engine-file");
    }

    while(readMethod.indexOf("**location**") >= 0){
      readMethod = readMethod.replace("**location**",methodLocation);
    }

    let writeMethod = await io.write(methodPath,readMethod);
    if(!writeMethod){
      return common.error("failed-write-method_engine-file");
    }

    //*************************
    //customize method controller

    const controllerPath = apiDir + "/index.js"
    let readController = await io.read(controllerPath);
    if(!readController){
      return common.error("failed-read-method_controller-file");
    }

    const tag = "//do not remove this string or comment this is used by hozz cli to add methods to this api";
    const initiater = `require("./${method}").init();\n\n\t  ${tag}`;

    if(readController.indexOf(tag) < 0){
      return common.error("invalid method controller ,the index file in apis directory does not contain the flag comment where we add the method initiater, please fix this file by adding - '//do not remove this string or comment this is used by hozz cli to add methods to this api' comment inside the initiater function or initiate this app manually inside this file.");
    }

    readController = readController.replace(tag,initiater);

    if(!await io.write(controllerPath,readController)){
      return common.error("failed-write-method_controller-file");
    }

    common.success("successfull - method generated successfully");

  }

};
