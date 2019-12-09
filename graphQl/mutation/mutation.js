const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const {
  addUser,
  updateUser,
  loginUser,
  deleteUser,
  updateRoleUser
} = require('./user_mutation');
const {
  addBlog_type,
  updateBlog_type,
  deleteBlog_type
} = require('./blog_type_mutation');

const {
  addPermissions,deletePermissions,updatePermissions
} = require('./permissions_mutation');

const {
  addRoles,deleteRoles,updateRoles
} = require('./roles_mutation');

const {
  addBlog,
  addCommentToBlog,
  updateBlog,
  deleteBlog
} = require('./blog_mutation');
const {
  updateComment,
  deleteComment
} = require('./comment_mutation');


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBlog_type,updateBlog_type,deleteBlog_type,
    addBlog,addCommentToBlog,updateBlog,deleteBlog,
    updateComment,deleteComment,
    loginUser,updateUser,deleteUser,addUser,updateRoleUser,
    addPermissions,deletePermissions,updatePermissions,
    addRoles,deleteRoles,updateRoles

  }
});

module.exports = mutation;


// mutation{
//   addBlog(title:"forth",slug:"sdsd",description:"this first post",isPublish:true,auther:"ahmad",userId:"5d7fc84bd7ebcc3a60c6d8b5",blogTypeId:"5d7e4ef1745bb018509326da"){
//     id
//   }
// }
// mutation{
//   deleteBlog(id:"5d81f5903787b02fdcde3c2d"){
//     id
//   }
// }

// mutation{
//   addCommentToBlog(id:"5d811b8fdc5ad02b201ee2cc",message:"very good",userId:"5d7fc84bd7ebcc3a60c6d8b5",rating:5){
//     title
//   }
//   }

// mutation{
//   deleteComment(blogId:"5d811b8fdc5ad02b201ee2cc",id:"5d811c6751962c0e607bb1ac",userId:"5d7fc84bd7ebcc3a60c6d8b5"){
//   title
//  }
//  }

// mutation{
//   updateComment(blogId:"5d811b8fdc5ad02b201ee2cc",comment:{id:"5d811c6751962c0e607bb1ac",message:"comment updated",rating:1,userId:"5d7fc84bd7ebcc3a60c6d8b5"}){
//    comments{
//      message
//    }
//  }


// mutation{
//   deleteUser(id:"5d7fc84bd7ebcc3a60c6d8b5"){
//     name
//   }
// }