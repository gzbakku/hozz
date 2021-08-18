

module.exports = {init:init};

const crypto = require('crypto');
const common = require('../../common');
const io = require('../../io');
const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';
const ivlength = 16  // AES blocksize
const fs = require("fs");

async function init(password){

    common.tell("unlocking secure folder");

    let zipper = new zip();

    const cwd = await io.dir.cwd();
    let secure_folder = cwd + '/app/secure';
    let zip_file_location = cwd + '/secure.hlock';
    let unlocked_file_location = cwd + '/secure.zip';

    if(!await io.exists(zip_file_location)){
        return common.error("not_found => secure.hlock => " + zip_file_location);
    }

    common.tell("secure.hlock file found");

    let locked = await io.readJson(zip_file_location);
    if(!locked){
        return common.error("failed-read => secure.hlock => " + zip_file_location);
    }

    common.tell("secure.hlock parsed");
    let decrypted = await decrypt(password,locked);
    if(!decrypted){
        return common.error("failed-decrypt-secure.hlock");
    }

    common.tell("decryption complete");

    if(!await io.write(unlocked_file_location,decrypted)){
        return common.error("failed-write-unlocked_file_location => " + unlocked_file_location);
    }

    common.tell("decrypted zip file generated");

    // console.log(fs);

    let extract = await fs.createReadStream(unlocked_file_location)
    .pipe(unzipper.Extract({ path: secure_folder }));

    common.tell("zip file extracted to secure directory");

    if(!await io.delete(unlocked_file_location)){
        return common.error("failed-delete-unlocked_secure.zip-file => " + unlocked_file_location);
    }

    common.tell("secure.zip deleted");

    common.error("please remove secure.zip from your recycle bin");

    common.success("unlock complete");

}


async function decrypt(password,data){

    return new Promise(async (resolve,reject)=>{

        let key;
        try {
            key = crypto.scryptSync(password, 'salt', 32);
        } catch (_) {
            reject("failed-generate-key");
        }
        const iv = await make_iv();
        if(!iv){
            reject("failed-make_iv-encrypt");
        }

        let decipher;
        try {
            let parse_iv = toByteArray(data.iv);
            decipher = crypto.createDecipheriv(algorithm, key, parse_iv);
        } catch (e) {
            console.log(e);
            reject("failed-generate-decipher_builder");
        }

        let decrypted = '';

        let chunks = [];

        decipher.on('readable', (data) => {
            while(true){
                let read = decipher.read();
                if(!read){break;} else {
                    chunks.push(read);
                }
            }
        });
        decipher.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        try {
            decipher.write(data.data,'base64');
        } catch (e) {
            console.log(e);
            reject("failed-update-decipher_builder");
        }

        try {
            decipher.end();
        } catch (e) {
            console.log(e);
            reject("failed-update-decipher_builder");
        }

    })
    .then((d)=>{return d;})
    .catch((e)=>{
        console.log(e);
        return false;
    });

}

function toByteArray(hexString) {
    var result = [];
    for (var i = 0; i < hexString.length; i += 2) {
      result.push(parseInt(hexString.substr(i, 2), 16));
    }
    return Buffer.from(result);
  }

function make_iv(){
    return new Promise((resolve,reject)=>{
        const buf = Buffer.alloc(16);
        crypto.randomFill(buf, (err, iv) => {
            if(err){reject(err);} else {resolve(iv);}
        });
    })
    .then((d)=>{return d;})
    .catch((e)=>{
        console.log(e);
        return false;
    })
}