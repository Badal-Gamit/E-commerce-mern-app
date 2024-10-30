import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'
import axios from 'axios'

const Privateroute = () => {
  const [verify, setverify] = useState(false)
useEffect(() => {
  const Token=localStorage.getItem('data')
    const  userToken=JSON.parse(Token)
    const header={headers: {
      'Authorization':  userToken?.token?`Bearer ${userToken.token}`:""
    }}
  
axios.get('http://localhost:8000/dashboard/user',header).then(({data})=>{ console.log(data.message); data.message=="ok"?setverify(true):setverify(false) })
}, [])

return verify?<Outlet/>:<Spinner/>
}

export default Privateroute