const {clearCache}=require('./cache');

module.exports.clearByUserId=async(req,res,next)=>{
 await next();

 
 clearCache(req.user._id);
}

module.exports.clearByTypeId=async(req,res,next)=>{
    await next();
   
    clearCache("questionType");
   }