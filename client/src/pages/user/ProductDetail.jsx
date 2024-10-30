import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../component/layout/Layout'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { AddCart } from '../../redux/Slice/feature/Card'
import { useDispatch,useSelector } from 'react-redux'

const ProductDetail = () => {
    const {detail}=useParams()
    const [product, setproduct] = useState({ })
 const [RelatedProduct, setRelatedProduct] = useState([])
 const dispatch=useDispatch()
 const Card=useSelector((state)=>state.Card )

useEffect(() => {
  if (detail) {
    try {
        axios.get(`https://e-commerce-mern-app-t2gp.onrender.com/product-one/${detail}`).then(({data})=>{setproduct(data.product); return data.product} ).then((data)=>{ fetchSimilarProduct(data?.category?._id ,data?._id) })
    } catch (error) {
       console.log(error.message)
    }
  }
}, [detail])

const fetchSimilarProduct=(category,productid)=>{
    try {
        const cid=category
        const pid=productid
       
        axios.get(`https://e-commerce-mern-app-t2gp.onrender.com/related-product/${cid}/${pid}`).then(({data})=>{setRelatedProduct(data?.product)})
    } catch (error) {
         console.log(error.message)
    }
}

  return (
    <Layout> 
        <div  className='grid grid-cols-5 pt-8' >
         <div className='col-span-2' >
         <div >
                <img className="p-8 rounded-t-lg w-3/4" alt=''src={`https://e-commerce-mern-app-t2gp.onrender.com/product-image/${product._id}`} />
            </div>
         </div>
         <div className='col-span-3' >
              <h1 className=' font-semibold text-5xl text-center' >Product Detail </h1>
              <div className='mt-20' >
                <div className='text-lg my-4 ' ><strong>name:</strong>  {product.name } </div>
                <div className='text-lg my-4 ' > <strong>Discription:</strong>  {product. discription } </div>
                <div className='text-lg my-4 ' > <strong>Category:</strong> { product?.category?.name}  </div>
                <div  className='text-lg my-4 ' >  <strong> Price:</strong>  {product.price } </div>
                <div className='mt-5' > <button  onClick={ ()=>{
                  dispatch(AddCart([...Card,product])) ; 
                  localStorage.setItem('card',JSON.stringify([...Card,product]))
                   toast.success('item added') } }      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  >Add to cart</button>  </div>
              </div>
         </div>
        </div>
        <div className='px-10' >
          <hr />
        <h1 className='text-2xl font-medium' >Similar Details</h1>
        <div className='flex gap-2 my-4' >
        {RelatedProduct.length>0? RelatedProduct?.map((i)=>{
 return    <div key={i._id} className="w-full max-w-64 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 <NavLink to={`/product/${i._id}`} >
<div className='transition-transform duration-300 ease-in-out  hover:scale-105 hover:brightness-95 ' >
    <img className=" rounded-t-lg" alt=''src={`https://e-commerce-mern-app-t2gp.onrender.com/product-image/${i._id}`} />
</div>
</NavLink>
<div className="px-5 pb-5 bg-slate-100 "> 
 <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white my-1 ">{(i.name)}</h5>
 <h5 className="text-base font-medium tracking-tight text-gray-900 dark:text-white   ">{(i.discription).slice(0,35)}...</h5>
  <div className="flex items-center mt-2.5 mb-5">
        </div>
    <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">${i.price}</span>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{ 
       dispatch(AddCart([...Card,i])) ; 
       localStorage.setItem('card',JSON.stringify([...Card,i]))
        toast.success('item added')
        }}  >Add to cart</button>
    </div>
</div>

</div>
        }): <div className='mt-5 text-2xl font-medium' >no similar product found </div> }
        </div>
        </div>
    </Layout>
    )
}

export default ProductDetail