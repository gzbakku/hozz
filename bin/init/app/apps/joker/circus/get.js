module.exports = {init:init};

function init(){

  const app = engine.server.app;

  app.get('/apps/joker/circus/get',async (req,res)=>{

    const log = false,test = false;

    engine.common.tell('called-joker-circus-get',log);

    let verify = await engine.resp.verify(req,res);
    if(!verify){
      engine.common.error('failed-verify');
      return false;
    }
    let user = verify,data = req.body;

    engine.common.tell('verified-joker-circus-get',log);

    let validate = engine.validate.json({
      name:{type:'string',min:32,max:32,elective:true},
      email:{type:'string',min:32,max:32,elective:true},
    },data);
    if(!validate){
      engine.common.error('failed-validate');
      return engine.resp.invalidRequest(res);
    }

    //************
    //do something here

    engine.common.tell('finished-joker-circus-get',log);

    return engine.resp.success(res,{
      hello:true
    });

  });

}
