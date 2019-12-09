
const graphql=require('graphql');
const axios=require('axios');
const {CommentType}=require('../type/comment_type');

const {User} = require('../../model/users')
 const {Blog,Comment} = require('../../model/blog')
 const BlogTyped = require('../../model/blogType')


const {
GraphQLObjectType,
GraphQLBoolean,
GraphQLString,
GraphQLInt,
GraphQLID,
GraphQLList,
GraphQLSchema
}=graphql

const  comment={
    type:require('../type/comment_type') ,
    args:{id:{type:GraphQLID}}, 
    resolve(parent,args){
       return Comment.findById(args.id);
      
    }
}


module.exports=comment;