const graphql = require('graphql');
const { GraphQLString ,GraphQLID,GraphQLList} = graphql;


const {Roles,Permissions} = require('../../model/roles')

const Roles_type=require('./../type/roles_type');


module.exports.addRoles= {
    type: Roles_type,
    args: {
      name: { type: GraphQLString },
      permissions: { type:new GraphQLList(GraphQLString) },
     
    },
    async   resolve(parentValue, { name,permissions}) {
      let permissionsResult= await Permissions.find({_id:{$in:permissions}});
      if(!permissionsResult) throw new Error('Unauthenticated');
      return (new Roles({ name,permissions:permissionsResult})).save()
    }
  }
  module.exports.updateRoles= {
    type: Roles_type,
    args: {
      id:{type:GraphQLID},
      name: { type: GraphQLString },
      permissions: { type:new GraphQLList(GraphQLString) },
     
    },
  async resolve(parentValue, { name,id,permissions}) {
        let permissionsResult= await Permissions.find({_id:{$in:permissions}});
        if(!permissionsResult) throw new Error('Unauthenticated');
        const rolsResult=await Roles.findByIdAndUpdate(id,
            {
                $set:{
                    name:name
                },
                $set:{permissions:permissionsResult}
            },{new:true});
            if(!rolsResult) throw new Error('Unauthenticated');
     return rolsResult
    }
  }
  module.exports.deleteRoles= {
    type: Roles_type,
    args: {
      id:{type:GraphQLID},
    
    },
    resolve(parentValue, { name,id}) {
     return Roles.findByIdAndRemove(id);
    }
  }
