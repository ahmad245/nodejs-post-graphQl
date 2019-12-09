const graphql = require('graphql');
const { GraphQLObjectType,GraphQLInputObjectType ,GraphQLInt, GraphQLString, GraphQLID ,GraphQLBoolean,GraphQLList} = graphql;
const  pubsub =require('../subscriptions');


const {Blog,Comment} = require('../../model/blog')

const BlogTyped=require('./../type/blog_type');

const BlogUpdate = new GraphQLInputObjectType({
  name: 'BlogUpdate',
  fields: {
    title: { type: GraphQLString },
      slug: { type: GraphQLString },
      text: { type: GraphQLString },
      description: { type: GraphQLString },
      isPublish: { type: GraphQLBoolean },
      auther: { type: GraphQLString },
      userId:{type:GraphQLID},
      blogTypeId:{type:GraphQLID},
      imgUrl:{ type: GraphQLString },
      favorites: {type:GraphQLList(GraphQLString)},
      favoritesCount: {type:GraphQLInt},
  }
});


module.exports.addBlog= {
    type: BlogTyped,
    args: {
        title: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        text: { type: GraphQLString },
        isPublish: { type: GraphQLBoolean },
        auther: { type: GraphQLString },
        userId:{type:GraphQLString},
        blogTypeId:{type:GraphQLString},
        imgUrl:{ type: GraphQLString },
        favorites: {type:GraphQLList(GraphQLString)},
        favoritesCount: {type:GraphQLInt},
    },
    resolve(parentValue, { title,slug, description,text,isPublish,auther,userId,blogTypeId,imgUrl,favorites,favoritesCount},req) {
      // if(!req.isAuth) throw new Error('Unauthenticated');
      return (new Blog({title,slug, description,text,isPublish,auther,userId,blogTypeId,imgUrl,favorites,favoritesCount}).save())
      
    }
  }

  module.exports.addCommentToBlog={
    type: BlogTyped,
    args:{
        id:{type:GraphQLID},
        message:{type:GraphQLString},
        userId:{type:GraphQLID}
    },
   async resolve(parent,{id,message,userId,rating}){
      const comment=await new Comment({message,userId,rating}).save();
       const blogAddedComment=await  Blog.findByIdAndUpdate(id,{
            $push: { 'commentIds': comment } 
        },{new:true});
          pubsub.publish('comment',{comment})
           return blogAddedComment;
    }
  }

  

module.exports.updateBlog={
  type:BlogTyped,
  args:{
    id:{type:GraphQLID},
    blog:{type:BlogUpdate}
  },
  resolve(parent,{id,blog}){
  return    Blog.findByIdAndUpdate(id,{$set:blog},{new:true});
  }
}
module.exports.deleteBlog={
  type:BlogTyped,
  args:{
    id:{type:GraphQLID}
  },
  resolve(parent,{id}){
    return Blog.findByIdAndDelete(id);
  }
}

module.exports.favorite={
  type:BlogTyped,
  args:{
    id:{type:GraphQLID},
    
  },
  resolve(parentValue,{id},req){
   return   Blog.updateOne({
      _id:id,
      favorites:{$ne:req.req.userId}
    },{
      $inc:{favoritesCount:1},
      $push:{favorites:req.req.userId}
    }
    ,{new:true}
    )
  }
}

module.exports.unFavorite={
  type:BlogTyped,
  args:{
    id:{type:GraphQLID},
    
  },
  resolve(parentValue,{id},req){
   return   Blog.updateOne({
      _id:id,
      favorites:req.req.userId
    },{
      $inc:{favoritesCount:-1},
      $pull:{favorites:req.req.userId}
    }
    ,{new:true}
    )
  }
}

// mutation{
//   addBlog(title:"mongo",slug:"mongo",description:"this for test mongo",text
// :"<p>this is very interested",isPublish:true,auther:"ahmad",blogTypeId:"5d8262d9e130282f546a2831"
//   ){
//     title
    
//   }
// }