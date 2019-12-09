const mongoose=require('mongoose');
const Joi=require('joi');
const blogTypeSchema=new mongoose.Schema({
    name:{type:String,maxLength:250,minLength:1,required:true,index:true}
});

const BlogType=mongoose.model('blogType',blogTypeSchema);

function validate(blogTypeSchema)
{
    const schema={
        name:Joi.string().min(1).max(250).required(),
       
    }
    return Joi.validate(blogTypeSchema,schema);
}

module.exports.BlogType=BlogType;
module.exports.examTypeSchema=blogTypeSchema;
module.exports.validate=validate;
