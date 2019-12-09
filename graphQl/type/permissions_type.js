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

const Permissions_type=new GraphQLObjectType({
    name:"Permissions",
    fields:()=>({
        id:{type:GraphQLID} ,
        name:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        roles:{
            type:new GraphQLList(require('./roles_type')),
           async resolve(parent,args){
              let roles=await Roles.find({'permissions._id':parent.id});
             
              
              return roles
             // db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )
            }

        }
    })
})
module.exports=Permissions_type;