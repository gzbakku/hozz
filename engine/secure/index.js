

module.exports = {init:init};

const lock = require("./lock");
const unlock = require("./unlock");

async function init(api,password){

    global.zip = require("jszip");
    global.unzipper = require("unzipper");

    if(api !== "lock" && api !== "unlock"){
        api = await input.select("please select a valid api",['lock','unlock']);
    }

    if(typeof(password) !== "string" || password.length < 5){
        while(true){
            password = await input.text("please provide a password atleast 5 characters long.");
            if(typeof(password) === "string" || password.length >= 5){
                break;
            }
        }
    }

    if(api === 'lock'){
        lock.init(password);
    } else if(api === "unlock"){
        unlock.init(password);
    }

}