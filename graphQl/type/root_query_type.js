const user=require('../query/user_query');
const {blogType,blogTypes}=require('../query/blog_type_query');
const blog=require('../query/blog_query');
const {blogs}=require('../query/blog_query');
const {users,me}=require('../query/user_query')
const comment=require('../query/comment_query');
const {Role,Roles}=require('../query/roles_query');
const {Permissions,Permission}=require('../query/permissions_query');
const graphql=require('graphql');


const {
GraphQLObjectType,

}=graphql


const RootQurey=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user, users,me,
        blogType,blogTypes,
        blog, blogs,
        comment,
        Role,Roles,
        Permission,Permissions
    }
})
module.exports=RootQurey;
