const graphql = require('graphql');
const { GraphQLString ,GraphQLID} = graphql;


const {Permissions} = require('../../model/roles')

const Permissions_type=require('./../type/permissions_type');

module.exports.addPermissions= {
    type: Permissions_type,
    args: {
      name: { type: GraphQLString },
     
    },
    resolve(parentValue, { name}) {
      return (new Permissions({ name})).save()
    }
  }
  module.exports.updatePermissions= {
    type: Permissions_type,
    args: {
      id:{type:GraphQLID},
      name: { type: GraphQLString },
     
    },
    resolve(parentValue, { name,id}) {
     return Permissions.findByIdAndUpdate(id,{$set:{name}},{new:true});
    }
  }
  module.exports.deletePermissions= {
    type: Permissions_type,
    args: {
      id:{type:GraphQLID},
    
    },
    resolve(parentValue, { name,id}) {
     return Permissions.findByIdAndRemove(id);
    }
  }
