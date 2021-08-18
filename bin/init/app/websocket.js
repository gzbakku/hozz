

module.exports = {
    init:init
};

async function init(){

    //---------------------------
    //add websocket handlers
    //---------------------------

    //---------------------------
    //add message handler
    //---------------------------
    engine.server.app.message((channel_id,message,isBinary)=>{
        engine.server.send(channel_id,{reply:"akku"});
        return true;
    });

    //---------------------------
    //add websocket connection open handler
    //---------------------------
    engine.server.app.add_ws_open_hanlder((ws)=>{
        console.log("connection started");
    });

    //---------------------------
    //add websocket connection close handler
    //---------------------------
    engine.server.app.add_ws_close_handler((ws)=>{
        console.log("connection exited");
    });

}