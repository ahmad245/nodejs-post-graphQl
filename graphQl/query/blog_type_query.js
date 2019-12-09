const {BlogType} = require('../../model/blogType')
const {blogTypeLoader}=require('./../dataloaders/blogType-dataLoader');

const graphql=require('graphql');

const Blog_TypeType=require('../type/blog_type_type');
const {
GraphQLObjectType,
GraphQLBoolean,
GraphQLString,
GraphQLInt,
GraphQLID,
GraphQLList,
GraphQLSchema
}=graphql

module.exports.blogType={
    type:Blog_TypeType,
    args:{id:{type:GraphQLString}},
    resolve(parent,args,req){
      return req.blogTypeLoader.load(args.id)
    //  return BlogType.findById(args.id);

    }
}

module.exports.blogTypes={
    type:new GraphQLList(Blog_TypeType),
   
    resolve(parent,args){
      return BlogType.find();

    }
}

