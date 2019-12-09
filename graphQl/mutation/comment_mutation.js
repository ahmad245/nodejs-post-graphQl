const graphql = require('graphql');
const { GraphQLObjectType,GraphQLInputObjectType ,GraphQLInt, GraphQLString, GraphQLID ,GraphQLBoolean,GraphQLList} = graphql;


const {Blog,Comment} = require('../../model/blog')

const BlogTyped=require('./../type/blog_type');

const CommentUpdate=new GraphQLInputObjectType({
    name:'CommentUpdate',
    fields:{
      id:{type:GraphQLID},
      message:{type:GraphQLString},
      userId:{type:GraphQLID}
    }
  })

module.exports.updateComment={
    type :BlogTyped,
    args:{
      blogId:{type:GraphQLID},
      comment:{type:CommentUpdate}
    },
   async resolve(parent,{blogId,comment}){
        const blog=await Blog.findById(blogId);
        if(!blog ) throw new Error('blog not existe')
        if(!blog.commentIds.id(comment.id) ) throw new Error('comment not existe');
        if(blog.commentIds.id(comment.id).userId==null)throw new Error('comment not existe')
        if(blog.commentIds.id(comment.id).userId!=comment.userId ) throw new Error('user  not existe')
        if(comment.message){
          blog.commentIds.id(comment.id).message=comment.message;
        }
        if(comment.rating){
          blog.commentIds.id(comment.id).rating=comment.rating;
        }
         
        return blog.save();
  
        
    }
  }

  module.exports.deleteComment={
    type :BlogTyped,
    args:{
      blogId:{type:GraphQLID},
      id:{type:GraphQLID},
      userId:{type:GraphQLID}

    },
   async resolve(parent,{blogId,id,userId}){
        const blog=await Blog.findById(blogId);
        if(!blog ) throw new Error('blog not existe')
        if(!blog.commentIds.id(id) ) throw new Error('comment not existe')
        if(blog.commentIds.id(id).userId===null)throw new Error('comment not existe')
        if( blog.commentIds.id(id).userId!=userId ) throw new Error('user  not existe')
        blog.commentIds.id(id).remove();
         
        return blog.save();
  
        
    }
  }