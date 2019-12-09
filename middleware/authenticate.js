const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
  User
} = require('../model/users')

const {Roles}=require('../model/roles')
//const config=require('./config');

const config = require('config');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;

const FacebookTokenStrategy = require('passport-facebook-token');
const configFacebook = require('../startup/configFacebook');


exports.local = passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({
    email: email.toLowerCase()
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, 'Invalid Credentials');
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, 'Invalid credentials.');
    });
  });
}));
//exports.local=passport.use(new LocalStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


let getToken = function (user) {
  return jwt.sign({
    userId: user._id,
    email: user.email
  }, config.get('secretKey'), {
    expiresIn: 36000000
  });
}

let opts = {}
opts.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('secretKey');
//opts.secretOrKey="12345-67891-23456-78912"

exports.jwtPassport = passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
    // console.log('Jwt Payload',jwt_payload);
    User.findOne({
      _id: jwt_payload._id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }
));

exports.verifyUser = passport.authenticate('jwt', {
  session: false
});






//////Facebook
exports.facebookPassport = passport.use(new FacebookTokenStrategy({

  clientID: configFacebook.facebook.clientId,
  clientSecret: configFacebook.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({
    facebookId: profile.id
  }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!err && user !== null) {
      return done(null, user);
    } else {
      user = new User({
        email: profile.displayName
      });
      user.facebookId = profile.id;
      // user.firstname = profile.name.givenName;
      // user.lastname = profile.name.familyName;
      user.save((err, user) => {
        if (err)
          return done(err, false);
        else
          return done(null, user);
      })
    }
  });
}));




module.exports.signup = async ({name,email,password,req}) => {

  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }
  const existingUser = await User.findOne({email});
  if (existingUser) throw new Error('already exists');

  const roles=await Roles.findOne({name:"reader"});
  const user = new User({name,email,password,roles});
  return user.save();
}


module.exports.login = async ({
  email,
  password,
  req
}) => {

  const user = await User.findOne({
    email
  });
  if (!user) {
    throw new Error('User does not exist!')
  }
  const isEqual = await user.comparePassword(password, user.password);
  if (!isEqual) {
    throw new Error('Passowrd is incorrect!')
  }

  const token = getToken(user);
  return {
    success: true,
    status: "success",
    infoId: user._id,
    email: user.email,
    token: token,
    roles:user.roles.name
  };

};

function can(user, operation) {
  if (user.roles.permissions.find(a => a.name === operation)) return true
  else if (user.roles.permissions.find(a => a.name === 'all')) return true
  return false;
}
exports.verifyWrite = async(userId) => {
   let user=await User.findById(userId);
  if (user.isAdmin  && can(user, 'write')) return true;
  return false
}
exports.verifyRead = async(userId) => {
   let user=await User.findById(userId);
  if (user  && can(user, 'read')) return true;
  return false
}
exports.verifyUpdate =async(userId) => {
   let user=await User.findById(userId);
  if (user.isAdmin  && can(user, 'update')) return true;
  return false
}
exports.verifyDelete = async(userId) => {
   let user=await User.findById(userId);
  if (user.isAdmin  && can(user, 'delete')) return true;
  return false
}
exports.verifySuperAdmin = async(userId) => {
   let user=await User.findById(userId);
  if (can(user, 'all')) return true; 
 return false;
}






// function login({ email, password, req }) {
//     return new Promise((resolve, reject) => {
//       passport.authenticate('local', (err, user) => {
//         if (!user) { reject('Invalid credentials.') }

//         req.login(user, () => resolve(user));
//       })({ body: { email, password } });
//     });
//   }
















// exports.verifySuperUser=(req,res,next)=>{
//     if(!req.user.isAdmin || !can(req.user,'all') ) return res.status(403).send('access denied');
//     next();
// }

// exports.veryFyAdmin=(req,res,next)=>{  
//     if(!req.user.isAdmin) return res.status(403).send('access denied');
//     next();
// }


// exports.verifyUserWriter=(req,res,next)=>{ 
//     if(can(req.user,'write') && req.user.isActive)next();
//    else{ return res.status(403).send('You are not writer');}

// }
// exports.verfiyWriterOrAdmin=(req,res,next)=>{
//     if(req.user.isAdmin || !can(req.user,'write') || !req.user.isActive)
//     {
//         next();
//     }
//     else{
//         return res.status(403).send('access denied');
//     }
// }



// function requireAdmin() {
//     return function(req, res, next) {
//       User.findOne({ req.body.email }, function(err, user) {
//         if (err) { return next(err); }

//         if (!user) { 
//           // Do something - the user does not exist
//         }

//         if (!user.admin) { 
//           // Do something - the user exists but is no admin user
//         }

//         // Hand over control to passport
//         next();
//       });
//     }
//   }