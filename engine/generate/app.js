

module.exports = {

  init:async ()=>{

      //*************************
      //take text input
      let name = "akku";
      if(true){
        name = await input.text('app name');
        if(!name || name.length === 0){
          return common.error("please provide a valid app name");
        }
      }

      //************************
      //read all the sub dir in app dir
      const cwd = io.dir.cwd();
      const path = cwd + "/app/apps"
      const dirs = await io.dir.subDir(path);
      if(true){
        if(dirs.indexOf(name) >= 0){
          common.info("you can add or remove projects from the index file in the apps directory manually.");
          common.info("beaware to contnue you have to remove the directory with app name ????? caution");
          return common.error("directory with this app name already exists in the apps directory.");
        }
      }

      //************************
      //make dir
      const app_path = path + "/" + name;
      if(!await io.dir.ensure(app_path)){
        return common.error("failed-make_app_directory");
      }

      //************************
      //copy app contoller
      const appDir = io.dir.app();
      const from = appDir + "/bin/generate/api.js"
      const to = app_path + "/index.js";
      if(!await io.copy(from,to)){
        return common.error("failed-generate-app_controller-file");
      }

      //*************************
      //add this app in apps controller
      const controllerPath = path + "/index.js"
      let read = await io.read(controllerPath);
      if(!read){
        return common.error("failed-read-app_controller-file");
      }

      const tag = "//do not remove this string or comment this is used by hozz cli to add apps to this project";
      const initiater = `require("./${name}/index").init();\n\n ${tag}`;

      if(read.indexOf(tag) < 0){
        return common.error("invalid apps controller ,the index file in apps directory does not contain the flag comment where we add the app initiater, please fix this file by adding - '//do not remove this string or comment this is used by hozz cli to add apps to this project' comment inside the initiater function or initiate this app manually inside this file.");
      }

      read = read.replace(tag,initiater);

      if(!await io.write(controllerPath,read)){
        return common.error("failed-write-app_controller-file");
      }

      common.success("successfull - app generated successfully");

  }

};
