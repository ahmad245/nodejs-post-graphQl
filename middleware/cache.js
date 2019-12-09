const mongoose=require('mongoose');

   const redis=require('redis');
   const redisUrl='redis://127.0.0.1:6379';
   const client=redis.createClient(redisUrl);
   const util=require('util');

   client.hget=util.promisify(client.hget);

//    //do you have any data in redis releted to this query
//    const cachedCoursType=await client.get(req.params.courseTypeId);
//    //if yes respond to the request and return 
//     if(cachedCoursType){
//         console.log('serving from chach')
//         return  res.send(JSON.parse(cachedCoursType));
//     }
   //if no we need to respond to request and update cache to stor data

 // client.set(req.params.courseTypeId,JSON.stringify(courseType))

const exec=mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache=function(option={}){
    this.useCahe=true;
    this.hashKey=JSON.stringify(option.key || '');
    return this;
} 

mongoose.Query.prototype.exec=async function(){
    
  if(!this.useCahe){
     return exec.apply(this,arguments);
  }

  const key=JSON.stringify(Object.assign({},this.getQuery(),{collection:this.mongooseCollection.name}));

   const cache=await client.hget(this.hashKey,key);

   if(cache){
   
    
    const doc=JSON.parse(cache);
    
    return doc;
  //  console.log(Array.isArray(doc) ? doc.map(d=>new this.model(d)): new this.model(doc) );
    
    // return Array.isArray(doc) 
    // ? doc.map(d=>new this.model(d))
    // : new this.model(doc); 
    
    
   }
    
    const result=await exec.apply(this,arguments);
   
  let r=  client.hset(this.hashKey,key,JSON.stringify(result));
     client.expire(this.hashKey, 1000)
   
    return result;
    
    
}

module.exports={
    clearCache(hashKey)
    {
      
        client.del(JSON.stringify(hashKey));
      
      
    }
}