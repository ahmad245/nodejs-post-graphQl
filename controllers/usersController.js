// const {User,validation}=require('../model/users');
// const {Roles}=require('../model/memberShip/roles');
// const authenticate=require('../middleware/authenticate');
// const passport=require('passport');

// module.exports.get=async(req,res)=>{
//     const user=await User.findById(req.user._id).select('-password');
//     res.send(user);
// }
// module.exports.getAll=async(req,res)=>{
//   const pageSize=+req.query.pageSize;
//     const page=+req.query.page;
//     let users;
//     if(pageSize && page){
//        users=await User.find().skip(pageSize*(page-1)).limit(pageSize);
//     }
//    else{
//     users=await User.find().select('-password');
//    }
//    const TotalUser=await User.count();
//   res.send({users:users,TotalUser:TotalUser});
// }

// module.exports.signup=async(req,res)=>{
//     const result=  await Roles.findById(req.body.rolesId);
//     const result2=  await Roles.findOne({name:'user'})
// //  if(!result)return res.status(404).send("this is not found");    

//      const {error}=validation(req.body);
//     if(error)return res.status(400).send(error.details[0].message);
//     // let user=await User.findOne({email:req.body.email});
//     // if(user) return res.status(400).send('this user already exist');

//  User.register(new User({
//     username:req.body.username,
//      name:req.body.name,
//      phone:req.body.phone,
//      address:req.body.address,
//      gender:req.body.gender,
//      isAdmin:req.body.isAdmin,
//      isActive:req.body.isActive
// }),req.body.password,(err,user)=>{
//     if(err) {
//       res.statusCode = 500;
//       res.setHeader('Content-Type', 'application/json');
//       res.json({err: err,info:err});
//     }
//     else {
      
//         if(result && result.name==="admin")
//         {
         
          
//           user.isAdmin=true;
//           user.isActive=req.body.isActive;

          
//         }
//         if(result)
//        { user.roles= result;}
//        else if(!result){
//          user.roles=result2;
//        }
//         // user.isActive=req.body.isActive;
//         // user.isActive=true;
//       user.save((err,user)=>{
//         if(err){
//           res.statusCode = 500;
//           res.setHeader('Content-Type', 'application/json');
//           res.json({err: err,info:'ther are err here2'});
//           return;
//         }
//         passport.authenticate('local')(req, res, () => {
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'application/json');
//           res.json({success: true, status: 'Registration Successful!'});
//         });
//       })
     
//     }
//   });
// }

// module.exports.login=async(req,res)=>{
//     let token=authenticate.getToken({_id:req.user._id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({success: true,infoId:req.user._id,username:req.user.username, token:token, status: 'You are successfully logged in!'});
  
// }

// module.exports.loginWithFacebook=async(req,res,next)=>{
//   if (req.user) {
//     var token = authenticate.getToken({_id: req.user._id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({success: true, token: token, status: 'You are successfully logged in!'});
//   }
// }

// module.exports.logout=async(req,res,next)=>{
//     if(req.session)
//     {
//       req.session.destroy();
//       res.clearCookie('session-id');
//       res.redirect('/');
//     }
//     else{
//       var err=new Error('You Are Not Login');
//       err.status=403;
//       return next(err);
//     }
//   }
    
// module.exports.put=async(req,res)=>{
//     const result=  await Roles.findOne({_id:req.body.rolesId});
//     if(!result)return res.status(404).send("this role not found");    
//     let obj={};
//     if(req.body.isActive && result.name!=='user'){
//       obj.isActive=req.body.isActive;
//       obj.roles=result;
//       obj.isAdmin=true;
//     }
//     else if(result.name==='admin' || result.name==='superAdmin'){
//       console.log(result.name);
      
//       obj.roles=result;
//       obj.isAdmin=true;
//       obj.isActive=true;
//     }
//     else{
//       obj.roles=result;
//       obj.isAdmin=false;
//       obj.isActive=false;
//     }
//    const user=await User.findByIdAndUpdate(req.params.id,{$set:obj},{new:true});
   
//    if(!user)return res.status(404).send('this user not found');
//    res.send(user);
// }
// module.exports.putMe=async(req,res)=>{
 
//  const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
 
//  if(!user)return res.status(404).send('this user not found');
//  res.send(user);
// }



// module.exports.delete=async(req,res,next)=>{
//     const result=await User.findByIdAndDelete(req.params.id);
//     if(!result)return res.status(404).send('this user not found');
//     res.send(result);
// }




// // module.exports.post=async(req,res)=>{
// //     const {error}=validation(req.body);
// //     if(error)return res.status(400).send(error.details[0].message);
// //     let user=await User.findOne({email:req.body.email});
// //     if(user) return res.status(400).send('this user already exist');

// //     const result=  await Roles.find({_id:{$in:req.body.rolesId}}).select('-permissions');
// //  if(!result)return res.status(404).send("this is not found");    

// //      user=new User({
// //         name:req.body.name,
// //         password:req.body.password,
//         // email:req.body.email,
//         // phone:req.body.phone,
//         // companyName:req.body.companyName,
//         // companyUrl:req.body.companyUrl,
//         // companyLogoUrl:req.body.companyLogoUrl,
//         // companyEmail:req.body.companyEmail,
//         // roles: result
// //     });

// //     const salt=await bcrypt.genSalt(10);
// //     user.password=await bcrypt.hash(user.password,salt);
// //     await user.save();

// //     res.send({name:user.name,email:user.email});
// // }

// // router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
// //   if (req.user) {
// //     var token = authenticate.getToken({_id: req.user._id});
// //     res.statusCode = 200;
// //     res.setHeader('Content-Type', 'application/json');
// //     res.json({success: true, token: token, status: 'You are successfully logged in!'});
// //   }
// // });