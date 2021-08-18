const io = require("../../../io");
const { readJson } = require("../../../io");


module.exports = {init:init};

async function init(){

    common.tell("generating controller files");

    const app_dir = await io.dir.app();
    const cwd = await io.dir.cwd();
    const init_dir = app_dir + '/init';

    let files = [
        {
            from:`${init_dir}/app/server.js`,
            to:`${cwd}/app/server.js`
        },
        {
            from:`${init_dir}/app/resp.js`,
            to:`${cwd}/app/resp.js`
        },
        {
            from:`${init_dir}/app/auth.js`,
            to:`${cwd}/app/auth.js`
        },
        {
            from:`${init_dir}/app/websocket.js`,
            to:`${cwd}/app/websocket.js`
        },
        {
            from:`${init_dir}/app/websocket.js`,
            to:`${cwd}/app/websocket.js`
        },
        {
            from:`${init_dir}/Dockerfile`,
            to:`${cwd}/Dockerfile`
        },
        {
            from:`${init_dir}/.gitignore`,
            to:`${cwd}/.gitignore`
        },
        {
            from:`${init_dir}/.dockerignore`,
            to:`${cwd}/.dockerignore`
        }
    ];

    for(let file of files){
        if(!await copy(file.to,file.from)){
            return common.error("failed-generate_files");
        }
    }

    common.tell("generated controller files");

    let app_path = cwd + '/app/index.js';
    let app = await io.read(app_path);
    if(!app){
        return common.error("failed-read-index.js => " + app_path);
    }

    const app_comment_file_path = app_dir + '/update/v2/app.txt';
    const app_comment = await io.read(app_comment_file_path);

    if(app.indexOf(app_comment) < 0){
        app += app_comment;
    }

    if(!await io.write(app_path,app)){
        return common.error("failed-update-index.js => " + app_path);
    }

    common.tell("app initiater index file updated");

    let index_path = cwd + '/index.js';
    let index = await io.read(index_path);
    if(!index){
        return common.error("failed-read-index.js => " + index_path);
    }

    const index_comment_file_path = app_dir + '/update/v2/index.txt';
    const index_comment = await io.read(index_comment_file_path);

    if(index.indexOf(index_comment) < 0){
        index += index_comment;
    }

    if(!await io.write(index_path,index)){
        return common.error("failed-update-index.js => " + index_path);
    }

    common.tell("main initiater index file updated");

    common.tell("uninstalling deceprecated dependencies");

    let uninstall = await cmd.run('npm uninstall firebase-admin wett request')
    .then((data)=>{
      return true;
    })
    .catch((error)=>{
      return common.error(error);
    });
    if(!uninstall){
        return common.error("failed-uninstall-deceprecated-dependencies");
    }

    common.tell("installing new dependencies");

    const install = await cmd.run('npm i wett-uws')
    .then((data)=>{
      return true;
    })
    .catch((error)=>{
      return common.error(error);
    });
    if(!install){
        return common.error("failed-install-new-dependencies");
    }

    common.info("please follow up with comments added to main /index.js file and /app/index.js file to finish the update");

    common.success("update to v2 app format complete");
    

}

async function copy(to,from){
    if(!await io.copy(from,to)){
        return common.error("failed-generate_file => " + to);
    } else {
        return true;
    }
}