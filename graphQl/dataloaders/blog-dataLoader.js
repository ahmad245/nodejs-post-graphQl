const DataLoader=require('dataloader');
const {Blog} = require('../../model/blog')
async function batchBlog(keys){
    let blog= await Blog.find({_id:{$in:keys}})
    blog.sort((a,b)=>{
        return (keys.indexOf(a._id.toString()) - keys.indexOf(b._id.toString()))
    })
    return blog
}

module.exports=()=>new DataLoader((keys)=>{
    return batchBlog(keys)
})