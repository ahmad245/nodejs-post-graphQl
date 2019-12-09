const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);

const commentSchema=new mongoose.Schema({

    message:{ type:String,required:true},

    userId: { type: mongoose.Schema.Types.ObjectId,ref: 'user'}
},{timestamps:true})

const blogSchema=new mongoose.Schema({
    title:{type:String ,required:true,minlength:3},
    slug:{type:String,unique:true,sparse:true},
    description:{type:String,required:true,minlength:3},
    text:{type:String,required:true,minlength:3},
    isPublish:{type:Boolean,default:false},
    auther:{type:String,required:true,minlength:1},
    tags:{type:Array},
    favorites: {type:Array},
    favoritesCount: {type:Number},
    imgUrl:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    blogTypeId:{type:mongoose.Schema.Types.ObjectId,ref:'blogType'},
    commentIds:[commentSchema]
},{timestamps:true})

blogSchema.index({title:'text',description:'text'});
const Blog=mongoose.model('blog',blogSchema);
const Comment=mongoose.model('comment',commentSchema);

function validation(blogSchema){
    const schema={
        title:Joi.string().min(3).max(255).required(),
        slug:Joi.string(),
        description:Joi.string().min(3).required(),
        text:Joi.string().min(3).required(),
        isPublish:Joi.boolean().required(),
        auther:Joi.string().required(),
        imgUrl:Joi.string(),
        userId:Joi.objectId(),
        blogTypeId:Joi.objectId(),
        commentIds:Joi.array(),
        tags:Joi.array(),
        favorites: Joi.array(),
    favoritesCount:Joi.number(),
    }
    return Joi.validate(blogSchema,schema);
}

module.exports.Blog=Blog;
module.exports.Comment=Comment;
module.exports.validation=validation;