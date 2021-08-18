var crypto = require('crypto');

module.exports = {

  init:async (size)=>{

    const cwd = io.dir.cwd();
    const dir = cwd + "/app/secure";
    const file = dir + "/wett_keys.json";

    if(!await io.dir.ensure(dir)){
      return common.error("failed-ensure-secure_dir");
    }

    return new Promise(async (resolve,reject)=>{

      crypto.generateKeyPair('rsa', {
        modulusLength: Number(size),
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        }
      },async (err, publicKey, privateKey) => {

        if(err){
          common.error(err);
          common.error("failed-generate_keys");
          reject("failed-generate_keys");
          return;
        }

        const write = await io.write(file,JSON.stringify({
          private:privateKey,
          public:publicKey
        },null,1));
        if(!write){
          common.error(file);
          common.error("failed-write_wett_keys");
          reject("failed-write_wett_keys");
        } else {
          common.success("wett-rsa_keys-generated");
          resolve();
        }

      });

    });//Promise end



  }

};
