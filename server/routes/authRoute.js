const express=require('express');
const {registerController,loginController,resetPasswordController, updateProfileController, OrderController, AllorderController, OrderStatusController}=require('../controllers/authController');
const {authentication,isAdmin} = require('../middleware/jwtVerify');
const router=express.Router();
const user=require('../models/userModel')

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/reset-password',resetPasswordController)
router.get('/dashboard/user',authentication,async(req,res)=>{
   res.json({message:"ok"})
})
router.get('/dashboard/admin',authentication,isAdmin,async(req,res)=>{
   res.json({message:"ok"})
})

router.post('/user/update',authentication,updateProfileController)

router.get('/user/order/:id',OrderController)

router.get('/user/All-order',authentication,isAdmin,AllorderController)

router.patch('/order/status',authentication,isAdmin,OrderStatusController)

module.exports=router