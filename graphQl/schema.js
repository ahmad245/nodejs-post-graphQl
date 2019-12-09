const graphql=require('graphql');

const {
GraphQLSchema
}=graphql
const _=require('lodash');
const RootQueryType =require('./type/root_query_type');
const  mutations=require('./mutation/mutation');
const subscription=require('../graphQl/subscription/subscription');

module.exports=new GraphQLSchema({
    query:RootQueryType ,
    mutation: mutations,
      subscription:subscription
})

















// const UserType=new GraphQLObjectType({
//     name:'User',
//     fields:()=>({
//     id:{type:GraphQLString},
//     name:{type:GraphQLString},
//     username:{type:GraphQLString},
//     password:{type:GraphQLString},
//     blogs:{
//             type:new GraphQLList(BlogType),
//                 resolve(parent,args){ 
//                     return axios.get(`http://localhost:3000/users/${parent.id}/blogs`).then(res=>res.data); 
//             }
//         },
//     comments:{
//             type:new GraphQLList(CommentType),
//             resolve(parent,args){
//             }
//         }
//     })
   
// });


// const CommentType=new GraphQLObjectType({
//     name:'Comment',
//     fields:()=>({
//         id:{type:GraphQLString},
//         message:{type:GraphQLString},
//         rating:{type:GraphQLInt},
//         user:{
//             type:UserType,
//             resolve(parent,args){              
//             }
//         },
//          blog:{
//             type:BlogType,
//             resolve(parent,args){
               
//             }
//         }

//     })
// })

// const Blog_TypeType=new GraphQLObjectType({
//     name:"BlogType",
//     fields:()=>({
//         id:{type:GraphQLString} ,
//         name:{type:GraphQLString},
//         blog:{
//             type:new GraphQLList(BlogType),
//             resolve(parent,args){
//                 return axios.get(`http://localhost:3000/blogType/${parent.id}/blogs`).then(res=>res.data); 
//             }

//         }
//     })
// })


// const BlogType=new GraphQLObjectType({
//     name:"Blog",
//     fields:()=>({
//         id:{type:GraphQLString},
//         title:{type:GraphQLString},
//         slug:{type:GraphQLString},
//         description:{type:GraphQLString},
//         auther:{type:GraphQLString},
//         blogType:{
//             type:Blog_TypeType,
//             resolve(parent,args){
//                 return axios.get(`http://localhost:3000/blogType/${parent.blogTypeId}`).then(res=>res.data); 
//             }
//         },
//         user:{
//             type:UserType,
//             resolve(parent,args)
//             {               
//                 return axios.get(`http://localhost:3000/users/${parent.userId}`).then(res=>res.data); 
//             }
//         },
//         comments:{
//             type:new GraphQLList(CommentType),
//             resolve(parent,args)
//             {  
//              return parent.comments
//             }
//         }

//     })
// });

// const RootQurey=new GraphQLObjectType({
//     name:'RootQueryType',
//     fields:{
//         user:{
//             type:UserType,
//             args:{id:{type:GraphQLString}},
//             resolve(parent,args){
//                 return axios.get(`http://localhost:3000/users/${args.id}`).then(res=>res.data);
//             }
//         },
//         blogType:{
//             type:Blog_TypeType,
//             args:{id:{type:GraphQLString}},
//             resolve(parent,args){
//                 return axios.get(`http://localhost:3000/blogType/${args.id}`).then(res=>res.data);

//             }
//         },
//         blog:{
//             type:BlogType,
//             args:{id:{type:GraphQLString}},
//             resolve(parent,args){
              
                
//                     return axios.get(`http://localhost:3000/blogs/${args.id}`).then(res=>res.data);
//             }
//         },
//         comment:{
//             type:CommentType,
//             args:{id:{type:GraphQLString}},
//             resolve(parent,args){
               
                
//                 return axios.get(`http://localhost:3000/blogs/${args.id}`).then(res=>{
                   
//                     return  res.data.filter(el=>el.comments)
//                 });
//             }
//         }
//     }
// })
