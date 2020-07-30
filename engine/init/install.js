

module.exports = {

  init:(path)=>{
    process.chdir(path);
    return cmd.run('npm i')
    .then((data)=>{
      return true;
    })
    .catch((error)=>{
      common.error(error);
    });
  }

};
