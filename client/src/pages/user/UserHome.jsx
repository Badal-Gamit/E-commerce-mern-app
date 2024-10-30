import React,{useState,useEffect} from 'react'

const UserHome = () => {
  const [user, setuser] = useState({})

  useEffect(() => {
   const  {user}=JSON.parse(localStorage.getItem('data'));
   if (user) {
    setuser(user)
   }
  
  }, [])

  return (
    <div>
      <div  className='mt-20 max-w-max p-5 font-sans font-semibold text-5xl border-2' >
     <div>User Name : {user.name} </div>
     <div>User Email : {user.email} </div>
     <div>User Contact : {user.phoneNumber} </div>
     <div>User Address : {user.address} </div>
     
    </div>
    </div>
  )
}

export default UserHome