const mongoose = require('mongoose');
const graphql = require('graphql');
const BlogType=require('./blog_type');
const CommentType=require('./comment_type');
const {Blog,Comment} = require('../../model/blog')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema
} = graphql;

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    email:{type:GraphQLString},
    password:{type:GraphQLString},
    isAdmin:{type:GraphQLBoolean},
    roles:{
        type:require('./roles_type'),
        // resolve(parent,args){ 
        //     return parent.roles;
        // }
    },
    blogs:{
            type:new GraphQLList(BlogType),
                resolve(parent,args){ 
                    return Blog.find({userId:parent.id});
            }
        },
    comments:{
            type:new GraphQLList(require('./comment_type')),
            resolve(parent,args){
                return Comment.find({userId:parent.id});
            }
        }
    })
   
});
module.exports=UserType;