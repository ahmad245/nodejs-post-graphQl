const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const {comment}=require('../subscription/comment_subscription');
const subscription = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        comment
    
    }
  });
  
  module.exports = subscription;
