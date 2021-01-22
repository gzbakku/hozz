module.exports = {init:init};

function init(){

  const app = engine.server.app;

  app.post('**location**',async (req,res)=>{

    const log = false,test = false;

    //*****************
    /*
      authenticate - remove this auth check if you dont need auth
    */

    engine.common.tell('called-**location**',log);

    let verify = await engine.resp.verify(req,res);
    if(!verify){
      engine.common.error('failed-verify-**location**');
      return false;
    }
    let user = verify,data = req.body;

    engine.common.tell('verified-**location**',log);

    //*****************
    /*
      validate - remove this validate if you dont need it
    */

    let validate = engine.validate.json({
      name:{type:'string',min:3,max:256},
      email:{type:'email',min:3,max:512},
    },data);
    if(!validate){
      engine.common.error('failed-validate-**location**');
      return engine.resp.invalidRequest(res);
    }

    //************
    //do something here

    engine.common.tell('finished-**location**',log);

    //*****************
    //send response

    return engine.resp.success(res,{
      hello:true
    });

  });

}
