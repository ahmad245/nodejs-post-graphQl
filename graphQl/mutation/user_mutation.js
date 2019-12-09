const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType
} = graphql;


const {
  User
} = require('../../model/users')

const {
  Roles
} = require('../../model/roles')

const auth = require('../../middleware/authenticate');

const UserType = require('./../type/user_type');


// {success: true,infoId:req.user._id,username:req.user.username, token:token, status: 'You are successfully logged in!'}
const userSingUp = new GraphQLObjectType({
  name: 'userSingUp',
  fields: {
    success: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    status: {
      type: new GraphQLNonNull(GraphQLString)
    },
    infoId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    token: {
      type: new GraphQLNonNull(GraphQLString)
    },  
    roles: {
      type: new GraphQLNonNull(GraphQLString)
    },  }
});


module.exports.addUser = {
  type: UserType,
  args: {
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
  },
  async resolve(parentValue, {name,email,password}, req) {
    
    const r = await auth.signup({name,email,password, req});
    return r;
  }
}
module.exports.loginUser = {
  type: userSingUp,
  args: {
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        },
  async resolve(parentValue, {name,email,password}, req) {
    const r = await auth.login({email,password,req});
    return r;
  }
}
module.exports.updateUser = {
  type: UserType,
  args: {
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
        },
  resolve(parent, {id,name,email,password}) {
    return User.findByIdAndUpdate(id, {$set: {name,email,password}},{new: true});
  }
}

module.exports.updateRoleUser={
  type: UserType,
  args: {
    id: {type: GraphQLID},
    isAdmin: {type: GraphQLBoolean},
    role:{type:GraphQLString}
        },
  async resolve(parent, {id,role,isAdmin}) {
    const roles=await Roles.findById(role);
    if(!role) throw new Error('not found')
     if(isAdmin===undefined)isAdmin=false;
    
    return User.findByIdAndUpdate(id, {$set: {roles,isAdmin}},{new: true});
  }
}
module.exports.deleteUser = {
  type: UserType,
  args: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
  },
  resolve(parent, {
    id,
    name,
    email,
    password
  }) {
    return User.findByIdAndRemove(id);
  }
}