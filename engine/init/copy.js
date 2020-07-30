

module.exports = {

  init:async (path)=>{

    const appDir = io.dir.app();
    const baseDir = appDir + "/bin/init";

    const indexFromPath = baseDir + "/index.js";
    const indexToPath = path + "/index.js";
    if(!await io.copy(indexFromPath,indexToPath)){
      return common.error("failed-prepare-index-file");
    }

    const packageFromPath = baseDir + "/package.json";
    const packageToPath = path + "/package.json";
    if(!await io.copy(packageFromPath,packageToPath)){
      return common.error("failed-prepare-package-file");
    }

    const appFromPath = baseDir + "/app";
    const appToPath = path + "/app";
    if(!await io.copy(appFromPath,appToPath)){
      return common.error("failed-prepare-app-directory");
    }

    const hozzFromPath = baseDir + "/hozz.json";
    const hozzToPath = path + "/hozz.json";
    if(!await io.copy(hozzFromPath,hozzToPath)){
      return common.error("failed-prepare-hozz-config");
    }

    return true;

  }

};
