const graphql = require('graphql');
const { GraphQLString ,GraphQLID} = graphql;


const {BlogType} = require('../../model/blogType')

const Blog_TypeType=require('./../type/blog_type_type');

module.exports.addBlog_type= {
    type: Blog_TypeType,
    args: {
      name: { type: GraphQLString },
     
    },
    resolve(parentValue, { name}) {
      return (new BlogType({ name})).save()
    }
  }
  module.exports.updateBlog_type= {
    type: Blog_TypeType,
    args: {
      id:{type:GraphQLID},
      name: { type: GraphQLString },
     
    },
    resolve(parentValue, { name,id}) {
     return BlogType.findByIdAndUpdate(id,{$set:{name}},{new:true});
    }
  }
  module.exports.deleteBlog_type= {
    type: Blog_TypeType,
    args: {
      id:{type:GraphQLID},
    
    },
    resolve(parentValue, { name,id}) {
     return BlogType.findByIdAndRemove(id);
    }
  }
