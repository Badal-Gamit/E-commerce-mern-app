import React,{useState,useEffect} from 'react'
import { CgProfile } from "react-icons/cg";

import  {Link,NavLink,useNavigate,useLocation} from 'react-router-dom'
import { SearchApi,search } from '../../redux/Slice/api/search/SearchApi';
import { useDispatch,useSelector } from 'react-redux';


const Navbar = () => {
  const [userId, setuserId] = useState({}) 
  const [values, setvalues] = useState('')
  const navigation=useNavigate()
  const location=useLocation()
  const dispatch=useDispatch()
  const Card=useSelector((state)=>state.Card )
 


useEffect(() => {
const user=localStorage.getItem('data') 

if (user) {
  const  userToken=JSON.parse(user)
setuserId(userToken)
}

},[location,localStorage.getItem('data')])

const logoutHandle=()=>{
   localStorage.clear()
   setuserId({})
 navigation('/login')
}
const submitHandle=(e)=>{
  e.preventDefault()
  if (values.length>1) {
    dispatch(SearchApi(values))
   }else{
    console.log('yes')
    dispatch(search([]))
   }
   navigation('/search')
}


const SearchHandle=(event)=>{

 const { value}=event.target
setvalues(value)
 }

  return (
    <>
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-10 ">
  <div className="flex-1">    <Link className="btn btn-ghost text-xl"to={'/'} >E-commerce 🛍️</Link>
    
  </div>
  <div className="flex-none">
    <div className='catogry'>
    <div className="flex">
       <form  onSubmit={submitHandle}  >
       <input type="search" name="search" onChange={SearchHandle}    placeholder='search' className='bg-slate-100 w-64 p-2 mx-10 outline-1 outline hover:w-72   transition-[width] duration-300 ease-in' />
       </form>
      
  </div>
    </div>
    <div className="dropdown dropdown-end" onClick={()=>navigation('/card') }   >
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className=" rounded-lg badge-sm  text-blue-800 text-sm indicator-item">{Card.length}</span>
        </div>
      </div>
      
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
       <CgProfile size={38} /> 
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
    

        {userId?.user && <li>
        <Link to={`/dashboard/${userId?.user?.role===1?"admin":"user"}`}>
          {userId?.user?.role==1?<div className="justify-between">
           dashboard
          </div>:<div className="justify-between">
           Profile
          </div>}
          </Link>
        </li> }
         {userId?.user?<li onClick={logoutHandle} ><div>Logout</div></li>:<><li><Link to={'/login'}>Login </Link></li>
         <li><Link to={'/register'}>Registration </Link></li></> }
      
       
      </ul>
    </div>
  </div>
</div>
</>
  )
}

export default Navbar