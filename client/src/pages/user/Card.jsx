import React,{useEffect,useState} from 'react'
import Layout from '../../component/layout/Layout'
import { useSelector,useDispatch } from 'react-redux'
import { itemRemove,AddCart,clearCart } from '../../redux/Slice/feature/Card'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in';
import axios from 'axios'
import { toast } from 'react-toastify'

const Card = () => {
    const Card=useSelector((state)=>state.Card )
    const [user, setuser] = useState({})
    const [token, settoken] = useState('')
    const [Clienttoken, setClienttoken] = useState('')
    const [instance, setinstance] = useState('')
    const [loading, setloading] = useState(false)
    const dispatch =useDispatch()
    const redirect=useNavigate()
    


useEffect(() => {
  
  if (localStorage.getItem('card')) {
    const card=JSON.parse(localStorage.getItem('card')) 

    dispatch(AddCart(card)) 
  }
  
  if (localStorage.getItem('data')!=undefined && localStorage.getItem('data')!=null) {
    const {token,user}=JSON.parse(localStorage.getItem('data'))
    settoken(token)
  setuser(user)}
  
}, [])

useEffect(() => {
  if (token) {
    axios.get('https://e-commerce-mern-app-t2gp.onrender.com/braintree/token').then((response)=>{setClienttoken(response.data.clientToken)}).catch((err)=>{console.log(err) })
  }  
}, [token])
useEffect(() => {
 if (Clienttoken) {
    DropIn.create({
      authorization:Clienttoken,
        container: '#dropin-container'},
      (err,dropinInstance)=>{
      if (err) {
          console.log('error wyhile creating drop in',err)
      } else {
         setinstance(dropinInstance) 
      }
      } )
 }
}, [Clienttoken])

const PaymentHandle=(e)=>{
e.preventDefault()
instance.requestPaymentMethod(async(err,payload)=>{
 if (err) {
    console.log(err);
    return ;
 } else {
  try {
    const Token=localStorage.getItem('data')
         const  userToken=JSON.parse(Token)
         const header={headers: {
           'Authorization':  userToken?.user?`Bearer ${userToken.token}`:"" }}
           setloading(true)
         const {data} = await   axios.post(`https://e-commerce-mern-app-t2gp.onrender.com/braintree/payment/${user._id}`,{cart:Card,nounce:payload.nonce},header)
          
             setloading(false);
             toast.success('Payment  Complete Sucessfully')
            localStorage.removeItem('card')
            dispatch(clearCart())
            redirect('/dashboard/user/Order')
  } catch (error) {
       console.log(error)
       setloading(false)
  }
 }
})
}


const RemoveHandle=(product)=>{
  dispatch(itemRemove(product._id)) ;
  let card=Card.filter((item)=>{
    if (item._id!=product._id) return item
  })
  localStorage.setItem('card',JSON.stringify([...card])) ;
}


const TotalPrice=()=>{
  if (Card.length>0) {
      let price=0;
      Card.map((item)=>{
         price=price+ item.price
      })
      return price
  }
}
  return (
    <Layout> 
      <div  >
        <div className='text-center py-6' >
          <h1 className='text-3xl font-semibold' >{token?`hello , ${user.name}`:"please login to checkout"} </h1>
          <h4 className='text-xl font-medium' >{Card.length>0?`you have ${Card.length} item in your card `:'you have zero item in your cart' }</h4>
        </div>
        <div className='grid grid-cols-4  ' >
         <div className='col-span-2' >
            <div className='flex flex-col gap-3 px-5' >
          { 
            Card.map((product,i)=>{
        return     <div  className='flex gap-5 border-2 border-black items-center' key={(product._id+i)} >
                <div  >
                <img className="rounded-t-lg " alt=''src={`https://e-commerce-mern-app-t2gp.onrender.com/product-image/${product._id}`} />
            </div> 
            <div className='mx-2' >
                <div className='text-lg my-2 ' ><strong>name:</strong>  {product.name } </div>
                <div className='text-lg my-2 ' > <strong>Discription:</strong>  {(product. discription).slice(0,50)}... </div>
                <div  className='flex items-center justify-between' >
             <div  className='text-lg my-2 ' >  <strong> Price:</strong> ${product.price } </div>
              <button  className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" onClick={()=>RemoveHandle(product)} >Remove item</button>
             </div>
             </div></div>  })}
             {Card.length==0 && 
              <img src="/Card.svg"  className='w-3/4' alt="" />  }
          </div>
         </div>
         <div  className='col-span-2 text-center' >
           <h1 className='text-2xl font-medium mt-5' > Card Summary</h1>
           <h4 className='text-lg font-medium mt-3' > Total | checkout | Payment </h4>
          <hr />
           <h4 className='mt-5 font-semibold text-xl' > Total Price : $ { TotalPrice() || 0 } </h4>
           {token?(
          <>
          <h1 className='text-2xl font-medium ' >  current Address : {user?.address}  </h1>
          <button className='btn btn-primary   btn-outline  mt-4'  onClick={()=> redirect('/dashboard/user/Profile') }  >Change Address </button>
          </>):
          <button className='btn btn-primary   btn-outline  mt-4 '  onClick={()=> redirect('/login') }  >login to Checkout</button>
          }
        
        {Card.length>0 && <div className='mt-4 w-3/4  mx-28 '   >
           <div id='dropin-container'  > </div>
         {token &&  <button  disabled={!Clienttoken || !user.address || !instance }  onClick={PaymentHandle}  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  px-5 py-2.5 text-center me-2 mb-2 disabled: ">{loading?'processing ...':'Make Payment'}</button>  }
           </div> }
         </div>
        
         </div>
        </div>
       
    </Layout>
  )
}

export default Card