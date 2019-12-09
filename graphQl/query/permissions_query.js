const {Permissions} = require('../../model/roles')
const {blogTypeLoader}=require('./../dataloaders/blogType-dataLoader');

const graphql=require('graphql');

const Permissions_type=require('../type/permissions_type');
const {
GraphQLObjectType,
GraphQLBoolean,
GraphQLString,
GraphQLInt,
GraphQLID,
GraphQLList,
GraphQLSchema
}=graphql

module.exports.Permission={
    type:Permissions_type,
    args:{id:{type:GraphQLString}},
    resolve(parent,args,req){
     // return req.blogTypeLoader.load(args.id)
      return Permissions.findById(args.id);

    }
}

module.exports.Permissions={
    type:new GraphQLList(Permissions_type),
   
    resolve(parent,args){
      return Permissions.find();

    }
}

