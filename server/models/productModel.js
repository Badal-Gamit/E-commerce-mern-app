const monngoose = require('mongoose');
const productSchema=new monngoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required:true
    },
   discription : {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
category:{
    type:monngoose.Schema.Types.ObjectId,
    
    ref:'catgory'
},

shipping:{
 type:Boolean,
 default:false
},
quantity:{
 type:Number,
 required:true,
 default:1},
 Image:{
    data:Buffer,    
    contentType:String,
    },
},{timestamps:true})
module.exports=monngoose.model('product',productSchema)