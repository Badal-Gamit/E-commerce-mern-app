import React,{useState,useEffect} from 'react'

const AdminHome = () => {
const [user, setuser] = useState({})

useEffect(() => {
 const  {user}=JSON.parse(localStorage.getItem('data'));
 if (user) {
  setuser(user)
 }

}, [])

  return (
    <div  className='mt-20 max-w-max p-5 font-sans font-semibold text-5xl border-2' >
     <div>Admin Name : {user.name} </div>
     <div>Admin Email : {user.email} </div>
     <div>Admin Contact : {user.phoneNumber} </div>
    </div>
  )
}

export default AdminHome