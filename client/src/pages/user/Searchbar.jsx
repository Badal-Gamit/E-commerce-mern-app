import React from 'react'
import Layout from '../../component/layout/Layout'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Searchbar = () => {
    const Products=useSelector((state)=>state.search )
  return (
    <Layout>
      <div className='flex gap-2 flex-wrap' >
    {Products.map((product)=>{
return    <div key={product._id} className="w-full max-w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<NavLink to={`/product/${product._id}`} >
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
      }) }  
      </div>
      { Products.length==0 && <div  className='text-4xl font-sans font-bold' >No result Found </div>}
    </Layout>
  )
}

export default Searchbar