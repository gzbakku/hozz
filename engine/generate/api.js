

module.exports = {

  init:async ()=>{

    //************************
    //select app
    const cwd = io.dir.cwd();
    const path = cwd + "/app/apps"
    const apps = await io.dir.subDir(path);
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
        app = await input.select("choose app",dirs);
      }
    }
    const appDir = path + "/" + app;

    //*************************
    //take api text input
    let name = "house";
    if(true){
      name = await input.text('api name');
      if(!name || name.length === 0){
        return common.error("please provide a valid api name");
      }
    }
    const apiDir = appDir + "/" + name;
    if(!await io.dir.ensure(apiDir)){
      return common.error("failed-ensure-api_directory");
    }

    //************************
    //copy method contoller
    const bin = io.dir.app();
    const from = bin + "/bin/generate/method.js"
    const to = apiDir + "/index.js";
    if(!await io.copy(from,to)){
      return common.error("failed-generate-method_controller-file");
    }

    //************************
    //add api to app controller

    const apiController = appDir + "/index.js"
    let read = await io.read(apiController);
    if(!read){
      return common.error("failed-read-api_controller-file");
    }

    const tag = "//do not remove this string or comment this is used by hozz cli to add apis to this app";
    const initiater = `require("./${name}/index").init();\n\n  ${tag}`;

    if(read.indexOf(tag) < 0){
      return common.error("invalid apis controller ,the index file in api directory does not contain the flag comment where we add the app initiater, please fix this file by adding - '//do not remove this string or comment this is used by hozz cli to add apis to this app' comment inside the initiater function or initiate this app manually inside this file.");
    }

    read = read.replace(tag,initiater);

    // console.log(read);

    if(!await io.write(apiController,read)){
      return common.error("failed-write-api_controller-file");
    }

    common.success("successfull - api generated successfully");


  }

};
