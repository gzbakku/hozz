

module.exports = {

  init:async ()=>{
    const cwd = io.dir.cwd();
    const place = cwd + "/app/secure/wett_keys.json";
    if(await io.exists(place)){
      return common.error('already_exists-secure/wett_keys.json');
    }
    return true;
  }

}
