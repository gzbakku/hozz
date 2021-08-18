const io = require("../../io");


module.exports = {
    init:init
};

async function init(){

    const cwd = await io.dir.cwd();

    const package_path = cwd + '/package.json';

    common.tell("reading-package.json");

    let image_name;
    if(await io.exists(package_path)){
        let package = await io.readJson(package_path);
        if(!package){
            common.error("failed to read package.json");
            image_name = await input.text("please provide a name for docker image");
        } else {
            image_name = package.name;
        }
    }

    if(typeof(image_name) !== "string" || image_name.length === 0){
        return common.error("failed-read-project_name");
    }

    common.tell(`using image name : ${image_name}`);

    let containers = await docker().listContainers();
    for(let container of containers){
        if(container.Image === image_name){
            let get_cont = await docker().getContainer(container.Id);
            if(get_cont){
                await get_cont.kill();
            }
        }
    }

    containers = await docker().listContainers({all:true});
    for(let container of containers){
        if(container.Image === image_name){
            let get_cont = await docker().getContainer(container.Id);
            if(get_cont){
                await get_cont.remove();
            }
        }
    }

    await cmd.run(`docker build --tag ${image_name} .`)
    .then((data)=>{
      return true;
    })
    .catch((error)=>{
      common.error(error);
    });

    common.tell(`making a new conatiner`);
    let image = await docker().getImage(image_name);
    let find_container = await docker().createContainer({
        image:image.name
    });
    if(!find_container){
        return common.error("failed-create_container");
    }
    common.tell(`running newly generated conatiner => id : ${find_container.id}`);

    await find_container.start();

    let kill = false;
    while(kill !== true){
        kill = await input.confirm("hit enter when you are done to close the conatiner");
    }

    await find_container.kill();

}