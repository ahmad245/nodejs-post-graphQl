const {Roles} = require('../../model/roles')
const {blogTypeLoader}=require('./../dataloaders/blogType-dataLoader');

const graphql=require('graphql');

const roles_type=require('../type/roles_type');
const {
GraphQLObjectType,
GraphQLBoolean,
GraphQLString,
GraphQLInt,
GraphQLID,
GraphQLList,
GraphQLSchema
}=graphql

module.exports.Role={
    type:roles_type,
    args:{id:{type:GraphQLString}},
    resolve(parent,args,req){
     // return req.blogTypeLoader.load(args.id)
      return Roles.findById(args.id);

    }
}

module.exports.Roles={
    type:new GraphQLList(roles_type),
   
    resolve(parent,args){
 
      return Roles.find();

    }
}

