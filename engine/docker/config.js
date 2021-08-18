

module.exports = {
    init:init
};

async function init(){

    const appDir = io.dir.app();
    const baseDir = appDir + "/init";
    const cwd = await io.dir.cwd();

    console.log({
        baseDir:baseDir,
        appDir:appDir,
        cwd:cwd
    });

    const dockerFromPath = baseDir + "/Dockerfile";
    const dockerToPath = cwd + "/Dockerfile";
    if(!await io.copy(dockerFromPath,dockerToPath)){
      return common.error("failed-prepare-app-directory");
    }

    const dockerignoreFromPath = baseDir + "/.dockerignore";
    const dockerignoreToPath = cwd + "/.dockerignore";
    if(!await io.copy(dockerignoreFromPath,dockerignoreToPath)){
      return common.error("failed-prepare-app-directory");
    }

    common.success("docker file and docker ignore file generated successfully");

}