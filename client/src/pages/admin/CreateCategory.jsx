import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import { getCategory,deleteCategoryApi } from '../../redux/Slice/api/category/fetchCategory'


const CreateCategory = () => {

const Category=useSelector((state)=>state.getCategory)
const dispatch=useDispatch()
const [name, setname] = useState({})
const [isUpdate, setisUpdate] = useState(false)
const [id, setid] = useState('')


const categoryCall=()=>{
  console.log('yes','no')
  dispatch(getCategory()) 
 }


const submitHandle=async(e)=>{
  e.preventDefault()
  try {
    const Token=localStorage.getItem('data')
    const  userToken=JSON.parse(Token)
    const header={headers: {
      'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:""
    }}
 const {status,data}=await  axios.post('https://e-commerce-mern-app-t2gp.onrender.com/category',name,header)
 setname({})
 switch (true) {
  case status==200:
    toast.success(data.message);
    categoryCall()
     break;
    case status==201:
    toast.info(data.message)
    break;
 }
  } catch (error) {
    toast.error(error.message)}
}

const   updateHandle=async(e)=>{
  e.preventDefault()
  return toast.error("can't update it")
  try {
      const Token=localStorage.getItem('data')
      const  userToken=JSON.parse(Token)
      const header={headers: {
        'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:""
      }}
    const {data}= await  axios.patch(`https://e-commerce-mern-app-t2gp.onrender.com/category/${id}`,name,header);
    setisUpdate(false)
    setid('');
    categoryCall();
    setname({});
    toast.success(data.message);
  } catch (error) {
    toast.error(data.message);
    setisUpdate(false)
  }
}
const DeleteHandle=async({target})=>{
    return toast.error("can't delete it")
    dispatch(deleteCategoryApi(target.id))
    categoryCall()
    setisUpdate(false)

//   try {
//     const Token=localStorage.getItem('data')
//     const  userToken=JSON.parse(Token)
//     const header={headers: {
//       'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:""
//     }}
//  const{data}=await axios.delete(`https://e-commerce-mern-app-t2gp.onrender.com/category/${target.id}`,header)
//  toast.success(data.message)
// }catch (error) {
// toast.error(error.message)
// }
}
useEffect(() => {

  categoryCall()
}, [])


  return (
  <> 
  <div   className='  flex gap-7 flex-col'>
    <div className="h1 text-5xl font-semibold">Mangage Category</div>
    <div>
      <form onSubmit={ isUpdate?updateHandle:submitHandle} >
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name='name' value={name.name?name.name:''} onChange={(e)=>setname((name)=>{return { ...name, [e.target.name]:e.target.value } }) } />
    {isUpdate ?<button className="btn btn-outline btn-primary   m-1 mt-3"   >update Product</button>:<button className="btn btn-outline btn-primary   m-1 mt-3"   >Create Product</button>}
    </form>
      </div> 

    <div className="overflow-x-auto max-h-96 ">
  <table className="table text-xl ">
    {/* head */}
    <thead className='text-xl font-medium' >
      <tr>
        <th></th>
        <th>Name</th>
        <th>Action</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {Category?.map((c,i)=>{
   return     <tr key={c._id} >
    
       <th>{i+1}</th>
       <td className={id==c._id?'line-through':""} >{c.name}</td>
       <td><button className="btn btn-success" name={c.name} id={c._id}  onClick={({target})=>{   setid(target.id); setname({name:target.name}) ;setisUpdate(true)  }} >Edit</button>
       <button className="btn btn-error ml-1 " onClick={DeleteHandle} id={c._id} >Delete</button></td>
      </tr>

     })}
    {console.log(Category)}
    </tbody>
  </table>
</div>
</div>
  </>
  )
}

export default CreateCategory