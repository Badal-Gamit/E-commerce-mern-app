const { default: mongoose } = require('mongoose')
const  moongoose=require('mongoose')
const orderSchema=new moongoose.Schema({
   products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"product"
   } ],
   payment:{},
   buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
 status:{
    type:String,
    enum:['not proccess','processing','dilivered','cancel'],
    default:"not proccess"
 }
},{timestamps:true})
module.exports=moongoose.model('order',orderSchema)