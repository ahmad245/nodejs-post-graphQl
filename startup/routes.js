const express=require('express');

const auth=require('../middleware/isAuth');
const user=require('../routes/user');
const upload=require('../routes/upload');
const error=require('../middleware/errorHandling');
const userLoader=require('./../graphQl/dataloaders/user-dataLoader')
const blogLoader=require('./../graphQl/dataloaders/blog-dataLoader')
const blogTypeLoader=require('./../graphQl/dataloaders/blogType-dataLoader')

const passport = require('passport');




module.exports=function(app)
{
    app.use(express.json());
    app.use(auth);
    app.use('/api/upload',upload);   
    app.use(error);

}


