const DataLoader=require('dataloader');
const {User} = require('../../model/users')
async function batchUser(keys){
   
    let user=await User.find({_id:{$in:keys}})
    user.sort((a,b)=>{
        return (keys.indexOf(a._id.toString()) - keys.indexOf(b._id.toString()))
    })
    
    
    return user
}

module.exports=()=>new DataLoader((keys)=>{
    return batchUser(keys)
})