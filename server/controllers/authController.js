const userModel = require('../models/userModel')
const { hashPassword,comparePassword } = require('../helper/authorization');
const jwt=require('jsonwebtoken');
const orderModel=require('../models/OrderModel')
// register
const registerController = async (req, res) => {
    const{ name, address,email,phone, password,answer}=req.body
    
    const encrptPassword = await hashPassword(password)
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(201).json({
                message: "user already exist"
            })
        }
        const createUser = await userModel.create({
            name,
            email,
            password: encrptPassword,
            address,
            phoneNumber:phone,
            answer:answer
        })
         
        const token=jwt.sign(email,process.env.jwt_secret)
        return res.status(200).json({
            message: "user sucessfully created",
            user: createUser,
            sucess:true,
            token:token
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            sucess:false
        })
    }
}

//login

const loginController=async(req,res)=>{
  const {email,password}=req.body
  try {
    const user= await userModel.findOne({email})

    if (!user) {
   return   res.status(201).json({
        message:"invalid email or password"
      })}

    match=await comparePassword(password,user.password)

    if (match){ 
         const token=jwt.sign( user.email,process.env.jwt_secret)
        return res.status(200).json({message:"sucessfully login",
            token:token,
            user:user
        })}

   return  res.status(201).json({ message:"invalid email or password"}) 
  } catch (error) {
    res.status(500).json({
        message:error.message})}  }
// reset-paasword 
const resetPasswordController=async(req,res)=>{
   const {email,answer,newPassword}=req.body
  
   try {
     const user=await userModel.findOne({email:email,answer:answer})
     if (user) {
     const encrptPassword = await hashPassword(newPassword)
     const np=  await  userModel.findByIdAndUpdate({_id:user._id},{password:encrptPassword} )
     console.log('sss')
    return   res.status(200).json({
        message:"sucessfully reset",
           })}

 return   res.status(201).json({
        message:'invalid answer or email'
    })
   } catch (error) {

  return    res.status(500).json({
        message:error.message
      })
   }
}

const updateProfileController=async(req,res)=>{
 const {name , password , address, phoneNumber,email}=req.body
   try {
    const user=await userModel.findOne({email:email })
    const token=jwt.sign(email,process.env.jwt_secret)
  if (password==user.password) {
       const user= await userModel.findOneAndUpdate({email:email},
         {
          name,
         password,
         address,
         phoneNumber  },{new:true});

     

         return res.status(200).json({
         message:'update sucessfully',
         user:user,
         token:token })
        }
     const newPassword= await hashPassword(password)
       const updateProfile=await userModel.findOneAndUpdate({email:email},{
          name,
         password:newPassword,
         address,
         phoneNumber 
         },
         {new:true})
         console.log(updateProfile)
         return res.status(200).json({
         message:'update sucessfully',
         user:updateProfile,
         token:token
         })
     
   } catch (error) {
    res.status(500).json({
        message:"failed to update"
    })
   } }

const OrderController=async(req,res)=>{
    try { 
        console.log(req.params.id)
        const order= await orderModel.find({buyer:req.params.id}).populate('products',"-Image")
        res.status(200).json({
            message:"succcess",
           order 
        })
    } catch (error) {
         
    }
   
}

const AllorderController=async(req,res)=>{
 try {
    const orderlist=await   orderModel.find({})
    .populate('products','-Image')
    .populate('buyer','name')
    .sort({createdAt:-1})

    res.status(200).json({
        message:"sucess to fetch All roder",  
        orderlist
    })

 } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"failed to fetch All roder",
        error
    })
 }
}

const OrderStatusController=async(req,res)=>{
   const   {id,status}=req.body
   try {
    const  response =  await  orderModel.findByIdAndUpdate({_id:id},{status:status},{new:true})

    res.status(200).json({message:"status change sucessfully"})
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"failed to change status",
        error
    })
   }
}


module.exports = { registerController,loginController,resetPasswordController,updateProfileController,OrderController,AllorderController,OrderStatusController }