

module.exports = {

  init:(path)=>{
    process.chdir(path);
    return cmd.run('npm i wett-uws dotenv')
    .then((data)=>{
      return true;
    })
    .catch((error)=>{
      common.error(error);
    });
  },

};
