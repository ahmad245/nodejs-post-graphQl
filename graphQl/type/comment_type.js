const mongoose = require('mongoose');
const UserType=require('./user_type');
const BlogType=require('./blog_type');
const graphql = require('graphql');
const {Blog,Comment} = require('../../model/blog')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const CommentType=new GraphQLObjectType({
    name:'Comment',
    fields:()=>({
        id:{type:GraphQLID},
        message:{type:GraphQLString},
        user:{
            type:require('./user_type'),
           async resolve(parent,args){         
                 const comment=await Comment.findById(parent.id).populate('userId');
                 return comment.userId
                //  console.log(comment.userId);
                 

            }
        },
         blog:{
            type:require('./blog_type'),
            resolve(parent,args){
               
            }
        }

    })
})
module.exports=CommentType