const io = require("../../io");


module.exports = {init:init};

async function init(path,name){

    console.log(path);

    let package_path = path + '/package.json';

    if(!await io.exists(package_path)){
        return common.error("not_found-package.json");
    }

    let package = await io.readJson(package_path);
    if(!package){
        return common.error("failed-read-package.json");
    }

    package.name = name;

    if(!await io.write(package_path,JSON.stringify(package,null,1))){
        return common.error("failed-update-package.json");
    }

    return true;

}