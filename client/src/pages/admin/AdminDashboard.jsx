import React from 'react'
import Layout from '../../component/layout/layout'
import Sidebar from '../../component/Admin/Sidebar'
import { Outlet } from 'react-router-dom'
const Admindashboard = () => {
  return (
    <Layout >
<div className='grid grid-cols-4' >
  <div className='col-span-1 ' >
  <Sidebar/>
  </div>
  <div className='col-span-3' >
       <Outlet/>
      </div>
      </div>
    </Layout>
  )
}
// 

export default Admindashboard