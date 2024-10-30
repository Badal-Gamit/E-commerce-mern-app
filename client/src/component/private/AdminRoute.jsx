import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import axios from 'axios'

const AdminRoute = () => {
  const [verify, setverify] = useState(false)
useEffect(() => {
  const Token=localStorage.getItem('data')
    const  userToken=JSON.parse(Token)
    const header={headers: {
      'Authorization':  userToken?.user?.role===1?`Bearer ${userToken.token}`:""
    }}
  
axios.get('https://e-commerce-mern-app-t2gp.onrender.com/dashboard/admin',header).then(({data})=>{ console.log(data.message); data.message=="ok"?setverify(true):setverify(false) })
}, [])

return verify?<Outlet/>:<Spinner/>
}

export default AdminRoute

