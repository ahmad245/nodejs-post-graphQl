
const mongoose = require('mongoose');
module.exports.courseTypeId=function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.courseTypeId))return res.status(404).send('InValid Id.');
    next();
}
module.exports.questionId=function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.questionId))return res.status(404).send('InValid Id.');
    next();
}
module.exports.examSectionId=function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id))return res.status(404).send('InValid Id.');
    next();
}

module.exports.examTypeId=function(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.examTypeId))return res.status(404).send('InValid Id.');
    next();
}