const mongoose = require('mongoose');
const {User} = require('../../model/users')
const {Blog} = require('../../model/blog')
const {BlogType} = require('../../model/blogType')



const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  
} = graphql;

const Blog_TypeType=new GraphQLObjectType({
    name:"BlogType",
    fields:()=>({
        id:{type:GraphQLID} ,
        name:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        blog:{
            type:new GraphQLList(require('./blog_type')),
            resolve(parent,args){
              return Blog.find({'blogTypeId':parent.id})
            }

        }
    })
})
module.exports=Blog_TypeType;