
function endSession(res){
  res.json({
    result:'error',
    error:'session_expired'
  });
  return false;
}

function invalidRequest(res){
  res.json({
    result:'error',
    error:'invalid_request'
  });
  return false;
}

function invalidPermissions(res){
  res.json({
    result:'error',
    error:'not_found-authorisation'
  });
  return false;
}

function technicalError(res){
  res.json({
    result:'error',
    error:'backend_down'
  });
  return false;
}

function down(res){
  res.json({
    result:'error',
    error:'backend_down'
  });
  return false;
}

function error(res,error){
  res.json({
    result:'error',
    error:error
  });
  return false;
}

function success(res,data,message){
  res.json({
    result:'success',
    data:data,
    message:message
  });
  return true;
}

async function verify(req,res){
  return engine.auth.verifyRequest(req)
  .then((decoded)=>{
    return decoded;
  })
  .catch((error)=>{
    let name;
    if(error.name){
      name = error.name;
    } else {
      name = error;
    }
    if(name == 'TokenExpiredError'){
      return endSession(res);
    } else if(name == 'JsonWebTokenError' || name == 'NotBeforeError'){
      return invalidRequest(res);
    } else {
      return invalidRequest(res);
    }
  });
}

module.exports = {
  verify : verify,
  endSession : endSession,
  invalidRequest : invalidRequest,
  invalidPermissions:invalidPermissions,
  technicalError : technicalError,
  error : error,
  success : success,
  down:down
}
