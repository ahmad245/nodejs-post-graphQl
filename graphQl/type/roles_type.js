const mongoose = require('mongoose');
const {User} = require('../../model/users')
const {Roles} = require('../../model/roles')


const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  
} = graphql;

const Roles_type=new GraphQLObjectType({
    name:"Roles",
    fields:()=>({
        id:{type:GraphQLID} ,
        name:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        permissions:{type:new GraphQLList(require('./permissions_type'))},
        users:{type:new GraphQLList(require('./user_type')),
        resolve(parent,args){
                return User.find({'roles._id':parent.id});
                    } 
                }
    })
})
module.exports=Roles_type;