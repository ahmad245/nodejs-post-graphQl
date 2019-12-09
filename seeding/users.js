const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
const db = config.get('db');
const {User}=require('./../model/users');

mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
console.log('seed');

const user=new User({
    name:SuperAdmin,
    email:'superAdmin@gmail.com',
    password:'111111',
    isAdmin:true,
    roles:'5dcc2a308ce5b63ef00ced10',
})

user.save(function(){
    mongoose.disconnect();
}
);
