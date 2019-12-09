const mongoose = require('mongoose');
const graphql = require('graphql');
const Blog_TypeType = require('./blog_type_type');
const UserType = require('./user_type');
const {
    CommentType
} = require('./comment_type');

const {
    User
} = require('../../model/users')
const {
    Blog
} = require('../../model/blog')
const BlogTyped = require('../../model/blogType')

const {
    blogLoader
} = require('./../dataloaders/blog-dataLoader')
const {
    blogTypeLoader
} = require('./../dataloaders/blogType-dataLoader')
const {
    usertLoader
} = require('./../dataloaders/user-dataLoader')

const DateTime = require('../helper/scalars-date-time-scalar');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQL
} = graphql;

const BlogType = new GraphQLObjectType({
    name: "Blog",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        },
        imgUrl:{ type: GraphQLString },
        auther: {
            type: GraphQLString
        },
        isPublish: { type: GraphQLBoolean },
        favorites: {
            type: new GraphQLList(GraphQLString)
        },
        favoritesCount: {
            type: GraphQLInt
        },
        createdAt: {
            type: GraphQLString
        },
        blogType: {
            type: require('./blog_type_type'),
            resolve(parent, args, req) {
                return req.blogTypeLoader.load(parent.blogTypeId.toString())
                // return BlogTyped.BlogType.findById(parent.blogTypeId);
            }
        },
        user: {
            type: require('./user_type'),
            resolve(parent, args, req) {
               // return req.userLoader.load(parent.userId.toString())
                 return User.findById(parent.userId)
            }
        },
        comments: {
            type: new GraphQLList(require('./comment_type')),
            async resolve(parent, args, req) {
                const b = await req.blogLoader.load(parent.id.toString())
                //const b=await Blog.findById(parent.id);
                return b.commentIds;

            }
        }

    })
});

module.exports = BlogType;