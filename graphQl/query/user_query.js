const graphql = require('graphql');
const verfiy=require('./../../middleware/authenticate')
const {
    User
} = require('../../model/users')
const UserType = require('../type/user_type');
const {
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
 
GraphQLInt,

} = graphql


const userReturn=new GraphQLObjectType({
    name:"usersReturn",
    fields:()=>({
      users:{type: new GraphQLList(require('../type/user_type'))},
      total:{type: GraphQLInt}
    })
  })

const me = {
    type: require('../type/user_type'),
   async resolve(parent, args, req) {
 
        
        if (!req.req.isAuth) throw new Error('Unauthenticated');
      let r=await verfiy.verifyRead(req.req.userId);

      
      //let user=await User.findById(req.req.userId)
      let user=await req.userLoader.load(req.req.userId)
      
        
        return user;


    }
}
const user = {
    type: require('../type/user_type'),
    args: {
        id: {
            type: GraphQLString
        }
    },
    resolve(parent, args) {
        return req.userLoader.load(args.id);


    }
}

const users = {
    type: userReturn,
    args:{page:{type:GraphQLInt},pageSize:{type:GraphQLInt},search:{type:GraphQLString}},
    resolve(parent, args) {
        if(args.page && args.pageSize) { return { users:User.find().skip(args.pageSize*(args.page-1)).limit(args.pageSize),total:User.count()};}

        return {users: User.find(),total:User.count()};
    }
}

module.exports = user;
module.exports.users = users;
module.exports.me = me;