const DataLoader=require('dataloader');
const {BlogType} = require('../../model/blogType')
async function batchBlogType(keys){
     let blogType= await BlogType.find({_id:{$in:keys}})
    blogType.sort((a,b)=>{
        return (keys.indexOf(a._id.toString()) - keys.indexOf(b._id.toString()))
    })
    return blogType
}

module.exports=()=>new DataLoader((keys)=>{
    return batchBlogType(keys)
})