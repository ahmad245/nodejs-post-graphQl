
const graphql=require('graphql');
const {blogLoader}=require('./../dataloaders/blog-dataLoader');

 const {Blog} = require('../../model/blog')

const BlogType=require('../type/blog_type');
const {
GraphQLObjectType,
GraphQLBoolean,
GraphQLString,
GraphQLInt,
GraphQLID,
GraphQLList,
GraphQLSchema,
GraphQLInputObjectType,


}=graphql

const  blog={
    type:BlogType,
    args:{id:{type:GraphQLString}},
    resolve(parent,args,req){
        console.log('from server');
        
 
      return req.blogLoader.load(args.id);
      //  return Blog.findById(args.id)
    }
}

const blogReturn=new GraphQLObjectType({
  name:"blogReturn",
  fields:()=>({
    blogs:{type: new GraphQLList(BlogType)},
    total:{type: GraphQLInt}
  })
})
const blogs={
    type:blogReturn,
    args:{id:{type:GraphQLString},page:{type:GraphQLInt},pageSize:{type:GraphQLInt},search:{type:GraphQLString}},
    resolve(parent,args,req){
      // if(!req.isAuth) throw new Error('Unauthenticated');
      if(args.search){
      
          return {blogs: Blog.find(
            { title: { "$regex":args.search, "$options": "i" }}).skip(args.pageSize*(args.page-1)).limit(args.pageSize),total:Blog.count( { title: { "$regex":args.search, "$options": "i" }})};
          

      }
      if(args.id) 
      {
        if(args.page && args.pageSize) return {blogs: Blog.find({'blogTypeId':args.id}).skip(args.pageSize*(args.page-1)).limit(args.pageSize),total:Blog.count({'blogTypeId':args.id})};
        return { blogs:Blog.find({'blogTypeId':args.id}), total:Blog.count({'blogTypeId':args.id})}

      } 
      if(args.page && args.pageSize) {
        return { blogs:Blog.find().skip(args.pageSize*(args.page-1)).limit(args.pageSize),total:Blog.count()};}
     
      return {blogs: Blog.find(),total:Blog.count()};


    }
}


module.exports=blog;
module.exports.blogs=blogs;