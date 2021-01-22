const common = engine.common;
const appy = engine.appy;
const io = engine.io;

module.exports = {init:init};

function init(){

  let app = engine.server.app;

  app.post('/apps/main/login',async (req,res)=>{

    //--------------------------------------
    // logging and testing switches

    const log = false,test = false;
    common.tell('called-apps-main-login',log);

    //--------------------------------------
    /*
      check request data here
      remove this check if you dont need to check
    */

    let data = engine.sanitize(req.body);
    let validate = engine.validate.json({
      email:{type:'email',min:5,max:512},
      password:{type:'string',min:1,max:512}
    },data);
    if(validate !== true){
      return appy.invalidRequest(res);
    }

    //--------------------------------------
    // check credentioals here

    //--------------------------------------
    // make session token here

    let session = {
      type:'normal',
      session_id:engine.md5(data.email + engine.uniqid() + engine.time.now()),
      email:data.email,
      ip:req.ip
    };

    //{expiresIn:'5000'}; // mili seconds
    session['token'] = await engine.auth.createToken(session,null,{
      expiresIn:'365d'
    });

    return engine.resp.success(res,{
      next:'login',
      data:session
    });

  });

  return true;

}
