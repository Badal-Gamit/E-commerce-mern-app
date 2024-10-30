const slugify = require('slugify');
const productModel=require('../models/productModel')
const fs=require('fs/promises')
const braintree = require("braintree");
const OrderMOdel = require('../models/OrderModel');
require('dotenv').config()

const gateway = new braintree.BraintreeGateway({
   environment: braintree.Environment.Sandbox,
   merchantId: process.env.Merchant_ID,
   publicKey:process.env.Public_Key,
   privateKey: process.env.Private_Key,
 });






const createProductController=async(req,res)=>{
   const{name,discription,price,category}=req.fields; 
   const {Image}= req.files; 
   

   
 try {
      switch (true) {
        case !name:res.status(400).json({message:"error in name feild"})
        case !discription:res.status(400).json({message:"error in discription feild"})
        case !price:res.status(400).json({message:"error in proce feild"})
        case !category:res.status(400).json({message:"error in  catogery feild"})
         }
         const product= await productModel.create({...req.fields,slug:slugify(name)});
         if (Image) {
            
            product.Image.data =await fs.readFile(Image.path);

            product.Image.contentType= Image.type
            await product.save()
            res.status(200).json({message:"sucess",product}) 
         } 
        

 } catch (error) {
     return res.status(500).json({
        message:"faile to create prodcut",
        error:error
     })}  }

const getProductController=async(req,res)=>{
   try {
    const product=await  productModel.find({}).select('-Image').sort({
      createdAt: 1 })
   res.status(200).json({message:"sucess",product}) 
  } catch (error) {
     res.status(500).json({message:"error getting produt",error}) 
    console.log(error);
    
   }
}
const deleteProductController=async(req,res)=>{
  try {
      const product= await  productModel.findByIdAndDelete({_id:req.params.id})
      res.status(200).json({message:"sucessfully deleted"})
  } catch (error) {
    res.status(500).json({message:"error while deleting produc",error}) 
  }
}

const getOneProductController=async(req,res)=>{
 try {
  const product=await productModel.findById({_id:req.params.id}).select('-Image').populate('category')

  res.status(200).json({
    message:"suceesfully fetch product",
    product
  })
 } catch (error) {
  res.status(500).json({message:"error while fetching product",error}) 
 }}
const getImageController=async(req,res)=>{
   try {
    const product=await productModel.findById({_id:req.params.pid}).select('Image')
            if (product.Image) {
              res.set({'Content-Type': product.Image.contentType})
         return    res.send(product.Image.data)
            }
   } catch (error) {
    res.status(500).json({message:"failed to load product image",error}) 
   }
}

const updateProductController=async(req,res)=>{
    const {name}=req.fields
    const {Image}= req.files; 
   
    
   
    try {
        const product= await productModel.findByIdAndUpdate({_id:req.params.id},{...req.fields,slug:slugify(name)},{new:true})
        if (Image) {
           product.Image.data =await fs.readFile(Image.path);
           product.Image.contentType= Image.type
             await product.save()
            } 
            return  res.status(200).json({message:"updat sucessfully",product}) 
            

} catch (error) {
  console.log(error);
  
    return res.status(500).json({
       message:"faile to update product",
       error:error
    })}}


const productFilterController=async(req,res)=>{
    
const{ selectRange,checked}=req.body;
const arrg={}
if (selectRange.length>0)arrg.price={$gte:selectRange[0],$lte:selectRange[1]} 
if (checked.length>0)arrg.category=checked

try {   
    const  product= await productModel.find(arrg)
        res.status(200).json({
         message:"sucess",
         product
        })

} catch (error) {
 res.status(500).json({message:'failed to filter'}) 
 
}}

const SearchController=async(req,res)=>{
try {
     const {keyword}=req.params
 const product=await  productModel.find({
  $or:[
     {name:{$regex:keyword,$options:"i" } },
     {discription:{$regex:keyword,$options:"i"} }] }).select('-Image')
  res.status(200).json({
   message:"sucess",
   product
  })
} catch (error) {
   res.status(500).json({message:'failed to search'}) 
}}


const RelatedProductControler=async(req,res)=>{
   const {cid,pid}=req.params
try {
   const product = await  productModel.find({
      category:cid,
      _id:{$ne:pid}
   }).select('-Image').limit(5)
   res.status(200).json({
      message:"sucess",
      product
     })

} catch (error) {
   res.status(500).json({message:'failed to fetch similar product'}) 
}
}

const paymentTokenController=async(req,res)=>{
   try {
      gateway.clientToken.generate({},(err,response)=>{
         if (err) {
            console.log(err);
            
             res.status(500).send(err)
         } else {
           res.status(200).send(response)
         }
        })
      
   } catch (error) {
        console.log(error)
   }

}

const checkoutController=async(req,res)=>{
   try {
      const{ nounce,cart} = req.body
   let totalPrice=0;
   console.log(nounce)
   cart.map((i)=> totalPrice=totalPrice +i.price )
   console.log(totalPrice)
   gateway.transaction.sale({
      amount: totalPrice,
      paymentMethodNonce:nounce,
    options: {
        submitForSettlement: true
      }},async(err,result)=>{
         if (result) {
          await   OrderMOdel.create({
              products:cart ,
              payment:result,
              buyer:req.params.id  })
              return  res.json({ok:true})}
     return res.status(500).send(err)
   })

   } catch (error) {
        console.log(error);
        
   }
}




// const ProductCountController=async(req,res)=>{
//  try {
//    const   Count= await  productModel.find({}).estimatedDocumentCount()
//    res.status(200).json({
//       message:"sucess",
//       Count
//    })
//  } catch (error) {
//    res.status(500).json({message:'failed to count'},error)  
//  }}

// const pageProductController=async(req,res)=>{
//   const page=req.params.page?req.params.page:1;
//   const limit=3
//    try {
//     const product= await  productModel.find({}).select('-Image').skip((page-1)*(limit)).limit(limit)
//   return  res.status(200).json({
//       message:"sucess",
//       product
//     })
//    } catch (error) {
//       res.status(500).json({
//          message:"error in pageload"
//       })
//    }

// }

module.exports={createProductController,
   getProductController,
   deleteProductController,
   getOneProductController,
   getImageController,
   updateProductController,
   productFilterController,
 SearchController,
 RelatedProductControler,
 paymentTokenController,
 checkoutController,
}