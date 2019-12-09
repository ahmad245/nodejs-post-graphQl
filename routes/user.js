const cors =require('../Cross-Origin-Resource/cors');

const userController=require('../controllers/usersController');
const authenticate=require('../middleware/authenticate');
const passport=require('passport');



const express=require('express');
const route=express.Router();
// route.options('*',cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get('/me', cors.corsWithOptions,authenticate.verifyUser,userController.get);

// //route.post('/',userController.post);
// route.get('/',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifySuperAdmin,userController.getAll);
// route.post('/sign-up',cors.corsWithOptions,userController.signup);
// route.post('/login',cors.corsWithOptions,passport.authenticate('local'),userController.login);
// route.get('/logout',cors.corsWithOptions,userController.logout);
// route.put('/role/:id',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifySuperAdmin,userController.put);
// route.put('/:id',cors.corsWithOptions,authenticate.verifyUser,userController.putMe);

// route.delete('/:id', cors.corsWithOptions,authenticate.verifyUser,authenticate.verifySuperAdmin,userController.delete);

module.exports=route;