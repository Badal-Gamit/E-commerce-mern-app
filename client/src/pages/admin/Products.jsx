import React ,{useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getProducts } from '../../redux/Slice/api/product/fetchProduct'
import { Link,useLocation,useNavigate } from 'react-router-dom'
const Products = () => {
   const products=useSelector((state)=>state.productApi)
   const dispatch=useDispatch()
   const location=useLocation()
   const navigation=useNavigate()


useEffect(() => {
  dispatch(getProducts())
 }, [location.pathname])


  return (
    <div className='flex gap-5 flex-wrap pt-5' >
 {products.length>0 ?products.map((product)=>{
   return    <div key={product._id} className="w-full max-w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <div className='transition-transform duration-300 ease-in-out  hover:scale-105 hover:brightness-95 ' >
      <img className=" rounded-t-lg" alt=''src={`https://e-commerce-mern-app-t2gp.onrender.com/product-image/${product._id}`} />
  </div>
 
  <div className="px-5 pb-5 bg-slate-100 "> 
   <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-1 ">{(product.name)}</h5>
   <h5 className="text-base font-medium tracking-tight text-gray-900 dark:text-white   ">{(product.discription).slice(0,35)}...</h5>
    <div className="flex items-center mt-2.5 mb-5">
          </div>
      <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
          <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={()=>{ 
  navigation(`/dashboard/admin/product/${product._id}`)
          }}  >Action</button>
      </div>
  </div>
 
</div>
     
     }):<div  className='w-full flex  h-60 gap-5 justify-center items-center' > 
   <span className="loading loading-spinner text-primary"></span>
<span className="loading loading-spinner text-secondary"></span>
<span className="loading loading-spinner text-accent"></span>
<span className="loading loading-spinner text-neutral"></span>
<span className="loading loading-spinner text-info"></span>
<span className="loading loading-spinner text-success"></span>
<span className="loading loading-spinner text-warning"></span>
<span className="loading loading-spinner text-error"></span>
     </div> }
   </div>
  )
}


export default Products