const  moongoose=require('mongoose')
const categorySchema=new moongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
   slug:{
    type:String,
    lowercase:true
   }
})
module.exports=moongoose.model('catgory',categorySchema)