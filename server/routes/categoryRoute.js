const express=require('express');
const router=express.Router();
const { createCategoryController, getCategoryController, updateCatogryController, getOneController, deleteCategoryController } = require("../controllers/categoryController");
const { isAdmin, authentication } = require('../middleware/jwtVerify');

router.post('/category',authentication,isAdmin,createCategoryController)
// router.patch()
router.get('/categorys',getCategoryController)

router.get('/category/:slug',getOneController );

router.delete('/category/:id',authentication,isAdmin,deleteCategoryController)

router.patch('/category/:id',authentication,isAdmin,updateCatogryController)

module.exports=router 