const winston=require('winston');
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const schema=require('../graphQl/schema');
const WS_GQL_PATH =require('../graphQl/subscriptions');
const {subscribe,execute}=require('graphql');
var http = require('http');
var https = require('https');

var fs = require('fs');

module.exports=function(app){
  const port=process.env.PORT||4000;
  // app.set('secPort',port+443);

  
  
  /**
 * Create HTTP server.
 */
 

var server = http.createServer(app);
new SubscriptionServer({ schema, execute, subscribe }, { server, path: WS_GQL_PATH });
return server.listen(port,()=>{winston.info(port)});
   
  // var options = {
  //   key: fs.readFileSync(__dirname+'/private.key'),
  //   cert: fs.readFileSync(__dirname+'/certificate.pem')
  // };
  
  // var secureServer = https.createServer(options,app);
  
  /**
   * Listen on provided port, on all network interfaces.
   */
  
  // secureServer.listen(app.get('secPort'), () => {

  //   winston.info(app.get('secPort'))
  // });
  //  secureServer.on('error', onError);
  // secureServer.on('listening', onListening);



}
    














// const winston=require('winston');

// var http = require('http');
// var https = require('https');

// var fs = require('fs');

// module.exports=function(app){
//   const port=process.env.PORT||3000;
//   app.set('secPort',port+443);
  
  
//   /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);
// server.listen(port,()=>{winston.info(port)});
   
//   var options = {
//     key: fs.readFileSync(__dirname+'/private.key'),
//     cert: fs.readFileSync(__dirname+'/certificate.pem')
//   };
  
//   var secureServer = https.createServer(options,app);
  
//   /**
//    * Listen on provided port, on all network interfaces.
//    */
  
//   secureServer.listen(app.get('secPort'), () => {

//     winston.info(app.get('secPort'))
//   });
//   //  secureServer.on('error', onError);
//   // secureServer.on('listening', onListening);



// }
    