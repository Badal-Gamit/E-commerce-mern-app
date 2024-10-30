import React,{useEffect,useState} from 'react'
import Layout from '../component/layout/Layout.jsx'
import {  NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { getCategory } from '../redux/Slice/api/category/fetchCategory'
import { getProducts } from '../redux/Slice/api/product/fetchProduct'
import  { prices}    from '../component/utility/price'
import axios from 'axios'
import { AddCart } from '../redux/Slice/feature/Card'
import { toast } from 'react-toastify'
import  banner from  '../../public/images/banner.png'


const Home = () => {
  const Category=useSelector((state)=>state.getCategory)
  const  ProductApi=useSelector((state)=>state.productApi )
  const Card=useSelector((state)=>state.Card )
  const [Products, setproducts] = useState([])
   const [checked, setchecked] = useState([])
  const [selectRange, setselectRange] = useState([])
  const dispatch=useDispatch()

useEffect(() => {
  
}, [])


useEffect(() => {
  dispatch(getCategory())
  dispatch(getProducts())
  if (Products==0 && checked.length==0 && selectRange==0 ) setproducts(ProductApi)
}, [ProductApi])

useEffect(() => {
if (checked.length!=0 || selectRange.length!=0) {
    const filter=async()=>{
            
     const body={checked,selectRange}
      console.log(checked)
   const {data}= await  axios.post('https://e-commerce-mern-app-t2gp.onrender.com/products/filter',body)
    console.log(data)
  setproducts(data?.product)
 }
 filter()
}}, [checked,selectRange])


const checkFilter=(e)=>{
 const   {value}=e.target
 let all=[...checked]
 
const isIncluded=all.includes(value)

if (isIncluded) {
const remove=all.filter((i)=>{
    if (i!=value) return i
  })

  setchecked(remove)
}else{
  all.push(value)
  setchecked(all)
}}

const  priceHandle=(p)=>{
 setselectRange(p)}
 

  return (
  <Layout>   
    <div  >
      <img src={banner}  className='w-full' alt="" />
    </div>
    <div className='grid grid-cols-5 p-5'  >
      <div className='col-span-1  '  ><h1 className='text-2xl font-semibold' >Filter by category</h1>
      <div className="my-5">
      {Category.map((c)=>{
         return <div  key={c._id} className="flex items-center gap-1 my-1">
         <input    id={`checked-checkbox-${c._id}`} onClick={checkFilter}    type="checkbox" value={c._id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
         <label htmlFor={`checked-checkbox-${c._id}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{c.name}</label>
     </div>
      })}
      </div>
<div>
  <hr className='border-2 ' />
      <h1 className='text-2xl font-semibold' >Filter by price</h1>
      {prices.map((p) => {
  return <div key={p._id} >
      <input
        checked={selectRange == p.range}
        id={`selectrange-${p._id}`} 
        type="radio"
        value={p.range}
        onChange={()=>priceHandle(p.range)}
        name="option"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
      <label
        htmlFor={`selectrange-${p._id}`} 
        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {p.name}</label></div>})}
</div>
     <div className='mt-4 text-center'>
      <button className='btn btn-neutral ' onClick={()=>{window.location.reload() }} >Reset all filter </button>
     </div>
      </div>
    <div className='col-span-4' ><h1 className='my-3 text-center text-4xl font-semibold ' >All Product</h1>
       <div className='flex gap-4 flex-wrap' >
        {Products.length>0?Products.map((product)=>{
         return    <div key={product._id} className="w-full max-w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
             <NavLink to={`product/${product._id}`} >
            <div className='transition-transform duration-300 ease-in-out  hover:scale-105 hover:brightness-95 ' >
                <img className=" rounded-t-lg" alt=''src={`https://e-commerce-mern-app-t2gp.onrender.com/product-image/${product._id}`} />
            </div>
            </NavLink>
            <div className="px-5 pb-5 bg-slate-100 "> 
             <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-1 ">{(product.name)}</h5>
             <h5 className="text-base font-medium tracking-tight text-gray-900 dark:text-white   ">{(product.discription).slice(0,35)}...</h5>
              <div className="flex items-center mt-2.5 mb-5">
                    </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{ 
                   dispatch(AddCart([...Card,product])) ; 
                   localStorage.setItem('card',JSON.stringify([...Card,product]))
                    toast.success('item added')
                    }}  >Add to cart</button>
                </div>
            </div>
           
        </div>
      }): <div  className='flex justify-center w-full' ><span className="loading loading-bars loading-lg "></span></div>}   
        </div>
        
      </div>
    
  </div>
  </Layout>
  )
}

export default Home