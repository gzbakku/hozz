

module.exports = {

  init:async (name,test)=>{
    const cwd = io.dir.cwd();
    const path = cwd + "/" + name;
    if(await io.exists(path)){
      if(test){return path;}
      return common.error("sub directory with project name already exists in this direcoty.");
    }
    if(!await io.dir.ensure(path)){
      return common.error("failed-make_project_directory");
    }
    return path;
  }

};
