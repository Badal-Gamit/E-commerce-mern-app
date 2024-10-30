import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate,useLocation} from 'react-router-dom'
import { getCategory } from '../../redux/Slice/api/category/fetchCategory'
import { setProduct,createProductApi } from '../../redux/Slice/api/product/productSlice'

const CreateProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const category=useSelector((state)=>state.getCategory)
  const  Product=useSelector((state)=>state.products )
  const dispatch=useDispatch()
  const navigation=useNavigate()
 

  const handleImageChange = (event) => {
       if (event.target.files && event.target.files[0]) {
        setImageFile(event.target.files[0]);
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
    
    }
  };
const changeHandle=({target})=>{
  dispatch(setProduct({[target.name]:target.value}))
}

  const handleSubmit =async(event) => {
   event.preventDefault()
   console.log(Product)
  dispatch(createProductApi({ ...Product,Image:imageFile}))
 
 };
useEffect(() => {
  dispatch(getCategory())
 
}, [])
useEffect(() => {
 if (Product==null) {
  dispatch(setProduct({}))
  navigation("/dashboard/admin/products")
 }

}, [Product])


  return (
    <div   className='  flex gap-7 flex-col'>
     
    <div className="h1 text-5xl font-semibold my-2">Mangage Category</div>
    
    <form onSubmit={handleSubmit}>
    <div>
    <label htmlFor="small-input"     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name </label>
    <input type="text" id="small-input" name='name'  value={Product?.name?Product.name:""}  onChange={changeHandle}  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>
<div>
<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an   Category option</label>
  <select id="countries" name='category'  onChange={changeHandle}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue=''>Choose category</option>
    {category.map((item)=>{
   return   <option key={item._id} value={item._id} >{item.name}</option>
    })}
  </select>
</div>
<div>
    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
    <input type="number" id="small-input" name='price' value={Product?.price?Product.price:""} onChange={changeHandle}  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
</div>


<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discription </label>
<textarea id="message" rows="4" name='discription' value={Product?.discription?Product.discription:""} onChange={changeHandle}  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-h-20"  placeholder="Write Discription here..."></textarea>

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept='image/*' onChange={handleImageChange} />
<div className='flex justify-between px-2 items-end' >
      {selectedImage?<div>
          <img src={selectedImage} alt="Selected" style={{ width: '18rem', height: '13rem', borderRadius:"1rem" }} />
        </div>:<div className=" w-72 h-52 border-2 pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg></div>}
            <button className= " text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5 h-12">Create Product</button>
            </div>
    </form> 
      </div>
  )
}

export default CreateProduct