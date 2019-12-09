const auth=require('../middleware/authenticate');

const cors =require('../Cross-Origin-Resource/cors');

const uploadController=require('../controllers/uploadController');
const express =require('express');
const route=express.Router();

route.options('*',cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get('/',cors.cors,auth.verifyUser,uploadController.get);

module.exports=route;
