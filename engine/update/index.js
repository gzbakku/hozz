

module.exports = {init:init};

const v2 = require("./v2/index");

async function init(version){

    let versions = ['v2'];

    if(!version || versions.indexOf(version) < 0){
        // version = await input.select("please select ba valid version to update from",versions);
        let confirm = await input.confirm("do you want to update to v2 template");
        if(!confirm){
            return common.error("no other template update is currenlty available.");
        } else {
            version = 'v2';
        }
    }

    if(version === "v2"){
        v2.init();
    }

}