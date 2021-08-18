

const wett_keys = require('./secure/wett_keys.json');

module.exports = {init:init};

async function init(){

    //---------------------------
    //load rsa keys
    //---------------------------
    let loadKeys = engine.auth.loadKeys(wett_keys.private,wett_keys.public);
    if(loadKeys instanceof engine.common.Error){
        return loadKeys.now("failed-load_keys").log();
    }

    //---------------------------
    //add session auth function
    //---------------------------
    engine.auth.sessions.add_auth_function((session_id)=>{
        return {
            session_id:session_id,
            uid:'some',
            channel_id:engine.md5("user"),
        };
    });

}
