const bcrypt = require('bcryptjs');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const {rolesSchema}=require('./roles')

const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String,minlength:3,maxlength:255,required:true},
    email:{type:String,minlength:3,maxlength:255,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    roles:{type:rolesSchema},
    facebookId: String,       
},{timestamps: true});

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
userSchema.pre('save', function save(next) {
    const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
        console.log(hash);
        
      if (err) {console.log("ahmad error",err);
       return next(err); }
      user.password = hash;
      next();
    });
  });
});
  // We need to compare the plain text password (submitted whenever logging in)
  // with the salted + hashed version that is sitting in the database.
  // 'bcrypt.compare' takes the plain text password and hashes it, then compares
  // that hashed password to the one stored in the DB.  Remember that hashing is
  // a one way process - the passwords are never compared in plain text form.
  userSchema.methods.comparePassword =  function  comparePassword(candidatePassword) {
      return    bcrypt.compare(candidatePassword, this.password)
  };
const User=mongoose.model('user',userSchema);

function validation(user)
{
    const schema={
        name:Joi.string().min(3).max(255).required(),
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().required(),
        rolesId:Joi.objectId(),
        facebookId:Joi.string(),
      
     
    }
    return Joi.validate(user,schema);
}
module.exports.userSchema=userSchema;
module.exports.User=User;
module.exports.validation=validation;
