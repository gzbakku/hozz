

module.exports = {init:init};

async function init(){

    //---------------------------
    //add http request handler for non route requests
    //---------------------------
    engine.server.app.all((req,res)=>{
        res.send("hello world");
    });

    //---------------------------
    //start server
    //---------------------------
    engine.server.init({
        port:process.env.PORT || 8080,
        cors:"*",
    });

}
