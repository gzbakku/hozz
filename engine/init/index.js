
const copy = require('./copy');
const check = require('./check');
const install = require('./install');

module.exports = {

  init:async (name,location)=>{

    //get proect root folder path here
    const do_check = await check.init(name,true); //here boolean or the second var is testing enabler // this skips the dir check
    if(!do_check){
      return common.error('failed-check-hozz_project-dir');
    }

    common.tell("finished-check-hozz_project-dir");

    //copy files from bin to this folder
    if(true){
      const do_copy = await copy.init(do_check);
      if(!do_copy){
        return common.error('failed-prepare-hozz_project-files');
      }
    }

    common.tell("finished-prepare-hozz_project-files");

    //copy files from bin to this folder
    const do_install = await install.init(do_check);
    if(!do_install){
      common.error("please install npm modules manually by running - 'npm i' in the project directory.");
      return common.error('failed-install-npm_modules');
    }

    common.tell("finished-install-npm_modules");

    const make_keys = await global.generate_keys(512)
    .then(()=>{return true;}).catch((e)=>{common.error(e);return false;});
    if(!make_keys){
      common.error("please generate wett rsa keys with command '$ hozz keys generate'");
      return common.error('failed-generate-rsa_keys-wett_keys');
    }

    common.tell("finished-generate-rsa_keys-wett_keys");

    return common.success("hozz project created successfully - " + name);

  }

};
