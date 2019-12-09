const { withFilter } =require('graphql-subscriptions');
const graphql = require('graphql');
const { GraphQLObjectType,GraphQLInputObjectType ,GraphQLInt, GraphQLString, GraphQLID ,GraphQLBoolean,GraphQLList} = graphql;

const {CommentType}=require('../type/comment_type')
const pubsub  =require('../subscriptions');
const {Blog,Comment}=require('../../model/blog');
module.exports.comment = {
    type: require('../type/comment_type'),
    args:{
        blogId:{type:GraphQLID},
    },
 async resolve(parent,{blogId}){
   const blog=await Blog.findById(blogId);
   if(!blog){throw new Error('post not found')}
   return pubsub.asyncIterator('comment');
  }
};