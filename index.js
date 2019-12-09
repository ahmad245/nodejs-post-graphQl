const winston=require('winston');
const express=require('express');
var path = require('path');
const expressGraphQL=require('express-graphql');
const { execute, subscribe } = require('graphql');
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const schema=require('../backend/graphQl/schema');

const userLoader=require('./graphQl/dataloaders/user-dataLoader')
const blogLoader=require('./graphQl/dataloaders/blog-dataLoader')
const blogTypeLoader=require('./graphQl/dataloaders/blogType-dataLoader')

const isAuth=require('./middleware/isAuth');
const cors = require('cors')


const PORT = 4000;
const subscriptionsEndpoint = `ws://localhost:${PORT}/subscriptions`;

var https = require('https');
var fs = require('fs');

const app=express();

// app.all('*', (req, res, next) => {
//     if (req.secure) {return next();}
//     else { res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url); }
//   });

app.use(express.static(path.join(__dirname,'public')));
app.use('/public/images',express.static(path.join(__dirname,'public/images')));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
 require('./startup/config')();
require('./startup/validations')();

// require('./middleware/cache');

app.use(cors());// enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use('/graphql',expressGraphQL((req,res,next)=>({
    schema,
    
    context:{
        userLoader:userLoader(),
        blogLoader:blogLoader(),
        blogTypeLoader:blogTypeLoader(),
        req,
    },
    graphiql:true,
  customFormatErrorFn:(err)=>{console.log(err.message);
   return err.message},
    subscriptionsEndpoint: subscriptionsEndpoint

    
})))
const server= require('./httpsSetting/httpsSetting')(app);
module.exports=server





// const port=process.env.PORT||3000;
// app.listen(port,()=>{winston.info(port)});

// app.set('secPort',port+443);



// /**
//  * Create HTTPS server.
//  */ 
 
// var options = {
//   key: fs.readFileSync(__dirname+'/private.key'),
//   cert: fs.readFileSync(__dirname+'/certificate.pem')
// };

// var secureServer = https.createServer(options,app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// secureServer.listen(app.get('secPort'), () => {
//    console.log('Server listening on port ',app.get('secPort'));
// });
// secureServer.on('error', onError);
// secureServer.on('listening', onListening);

// require('./https-setting/httpsConfig')();

// const port=process.env.PORT||3000;
// app.listen(port,()=>{winston.info(port)});



