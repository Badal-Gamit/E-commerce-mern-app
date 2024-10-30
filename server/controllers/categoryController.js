const  categoryModel=require('../models/categoryModel');
const slugify=require('slugify')

const createCategoryController=async(req,res)=>{
    const {name}=req.body
     try {
       const categoryAvaliable=  await categoryModel.findOne({name:name})
       if (categoryAvaliable) return res.status(201).json({message:"category is already exist"}) 
     const category= await   categoryModel.create({name:name,slug:slugify(name)});
     return res.status(200).json({
        message:"sucessfully category created",
        category
     })
     } catch (error) {
        res.status(500).json({
            message:`error is error creating category ${error.message}` 
        })
     }
}
// get category
const getCategoryController=async(req,res)=>{
   try {
   const getcatory= await  categoryModel.find({})
   return res.status(200).json({
    message:"suceesfull",
    getcatory   
   })
   } catch (error) {
    res.status(500).json({
        message:`error is error  while getting category ${error.message}` 
    })
 }
}

const updateCatogryController=async(req,res)=>{
      const {name}=req.body;
      const {id}=req.params
   console.log(id);
   
      try {
        const newCategory=  await  categoryModel.findByIdAndUpdate({_id:id},{name:name,slug:slugify(name)},{new:true})
   return res.status(200).json({
    message:"sucessfull update",
    newCategory
   })
    }
    catch (error) {
        res.status(500).json({
            message:`error is error  while update category ${error.message}` 
        })
     }
}


const getOneController=async(req,res)=>{
  try {
    const getOne= await categoryModel.findOne({slug:req.params.slug})
    return   res.status(200).json({
        message:"success",
        getOne
       })

  } catch (error) {
    res.status(500).json({
        message:`error is error  while get category ${error.message}` 
    })
 }
}

const deleteCategoryController=async(req,res)=>{  
   try {
    const message=await   categoryModel.findByIdAndDelete({_id:req.params.id})
   return res.status(200).json({
    message:"sucessfully deleted"
   })
    
   } catch (error) {
    res.status(500).json({
        message:`error is error  while delete category ${error.message}` 
    })
 }
}
module.exports={createCategoryController,getCategoryController,updateCatogryController,getOneController,deleteCategoryController}