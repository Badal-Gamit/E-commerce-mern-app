import React,{useState,useEffect} from 'react'
import axios from 'axios'
import  moment from 'moment'
import {toast} from 'react-toastify'

const User = () => {
const [order, setorder] = useState([])
const [selectStatus, setselectStatus] = useState(['not proccess','processing','dilivered','cancel'])
const [Status, setStatus] = useState('')
   
useEffect(() => {
  const Token=localStorage.getItem('data')
         const  userToken=JSON.parse(Token)
         const header={headers: {
           'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:"", }} 
axios.get(`http://localhost:8000/user/All-order`,header).then(({data})=>{ console.log(data)  ;setorder(data.orderlist)}).catch((err)=>{console.log(err) })
}, [])

const ProcessHandle=(e)=>{
  const {id,value }=e.target
  const Token=localStorage.getItem('data')
  const  userToken=JSON.parse(Token)
  const header={headers: {
    'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:"", }} 
    axios.patch(`http://localhost:8000/order/status`,{id:id,status:value},header).
    then(({data,status})=>{
   if (status==200) {
       toast.success(data.message)
   } else {
      toast.error(data.message)
   }
}).catch((err)=>{console.log(err) })
}
return (
  <div   >
  <div > {order?.map((o,i)=>{
  return  <div className="relative overflow-x-auto shadow-md sm:rounded-lg" key={o._id} >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                     #
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                   user
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                     date
                  </th>
                  <th scope="col" className="px-6 py-3">
                     payment
                  </th>
                 < th scope="col" className="px-6 py-3">
                    quantity
                  </th>
              </tr>
          </thead>
          
           <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {1+i}
                  </th>
                  <td className="px-6 py-4">
                     <select name="status" id={o._id} className='border cursor-pointer p-1 ' onChange={ProcessHandle}  >
                        <option defaultValue={o.status}>{o.status}</option>
                       {selectStatus.map((val,i)=>{
                        if (val!=o.status) return <option key={i} value={val}>{val}</option>
                       })}
                     </select>
                  </td>
                  <td className="px-6 py-4">
                     {o.buyer.name}
                  </td>
                  <td className="px-6 py-4">
                     {o?.payment?.transaction?.amount}
                  </td>
                  <td className="px-6 py-4">
                     {moment(o.createdAt).fromNow()}
                  </td>
                  <td className="px-6 py-4">
                     {o.payment.success?"success":"failed"}
                  </td>
                  <td className="px-10 py-4">
                     {o.products.length}
                  </td>
                </tr>
              </tbody>
      </table>
      {o?.products?.map((product)=>{
    return  <div  className='flex gap-5 border-2 border-black items-center' key={product._id} >
    <div  >
    <img className="rounded-t-lg " alt=''src={`http://localhost:8000/product-image/${product._id}`} />
</div> 
<div className='mx-2' >
    <div className='text-lg my-2 ' ><strong>name:</strong>  {product.name } </div>
    <div className='text-lg my-2 ' > <strong>Discription:</strong>  {(product. discription).slice(0,50)}... </div>
    <div  className='flex items-center justify-between' >
 <div  className='text-lg my-2 ' >  <strong> Price:</strong> ${product.price } </div>
 </div>
 </div>
 </div>}) }
  </div>
  }) } </div>
     {console.log(order)}
</div>
)
}

export default User