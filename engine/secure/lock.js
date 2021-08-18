const common = require("../../common");
const io = require("../../io");


module.exports = {init:init};

async function init(password){

    common.tell("locking secure folder");

    let zipper = new zip();

    const cwd = await io.dir.cwd();
    let secure_folder = cwd + '/app/secure';
    let zip_file_location = cwd + '/secure.hlock';

    if(!await io.exists(secure_folder)){
        return common.error("not_found-secure_folder => " + secure_folder);
    }

    common.tell("secure folder found");

    let tree = await tree_the_dir(secure_folder);
    if(!tree){
        return common.error("failed-generate-secure_directory-tree_structre");
    }

    common.tell("directory tree generated");

    let zip_it = await zip_tree(secure_folder,tree,zipper);
    if(!zip_it){
        return common.error("failed-generate-secure_directory-zip_structre");
    }

    let generate = await zip_it.generateAsync({type:"nodebuffer"})
    .then((d)=>{return d;})
    .catch((e)=>{
        console.log(e);
        return false;
    });
    if(!generate){
        return common.error("failed-generate_zip");
    }

    common.tell("directory zip generated");

    let encrypted = await encrypt(password,generate);
    if(!encrypted){
        return common.error("failed-decrypt-secure.zip");
    }

    common.tell("directory zip encrypted");

    if(!await io.write(zip_file_location,JSON.stringify(encrypted,null,2))){
        return common.error("failed-write-zip_file");
    }

    common.info("use the same password and unlock api to extract secure.hlock content to secure directory.");

    common.success("secure.hlock file generated successfully");

}

const crypto = require('crypto');
const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';
const ivlength = 16  // AES blocksize

async function encrypt(password,data){

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

        let cipher;
        try {
            cipher = crypto.createCipheriv(algorithm, key, iv);
        } catch (e) {
            console.log(e);
            reject("failed-generate-cipher_builder");
        }

        let encrypted = '';

        cipher.setEncoding('base64');

        cipher.on("data",(data)=>{
            encrypted += data;
        });

        cipher.on("end",()=>{
            // resolve(encrypted);
            resolve({
                iv:iv.toString("hex"),
                data:encrypted
            });
        });

        try {
            cipher.write(data,'binary', 'binary');
        } catch (e) {
            console.log(e);
            reject("failed-update-cipher_builder");
        }

        try {
            cipher.end();
        } catch (e) {
            console.log(e);
            reject("failed-update-cipher_builder");
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

async function zip_tree(path,tree,zipper,first){


    let folder;
    if(typeof(first) === "string"){
        folder = zipper.folder(first);
    } else {
        folder = zipper;
    }

    // console.log(first);

    for(let child of tree){
        if(typeof(child) === "object"){
            if(!await zip_tree(path+'/'+child.name,child.children,folder,child.name)){
                return false;
            }
        } else {
            let read = await io.readRaw(path+'/'+child);
            folder.file(child,read);
        }
    }

    return zipper;

}

async function tree_the_dir(path){

    let sub_files = await io.dir.files(path);
    if(!sub_files){
        return false;
    }
    let sub_folders = await io.dir.subDir(path);
    if(!sub_folders){
        return false;
    }

    for(let folder of sub_folders){
        let get_children = await tree_the_dir(path + "/" + folder);
        if(!get_children){
            return false;
        } else {
            sub_files.push({
                name:folder,
                children:get_children
            });
        }
    }

    return sub_files;

}