

module.exports = {

    init:(path)=>{
      process.chdir(path);
      return cmd.run('git init')
      .then((data)=>{
        return true;
      })
      .catch((error)=>{
        common.error(error);
      });
    },
  
  };
  