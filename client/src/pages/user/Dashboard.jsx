import React from 'react'
import MenuBar from '../../component/user/MenuBar'
import Layout from '../../component/layout/layout'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Layout >
<div className='flex gap-40' >
  <MenuBar/>
  <div >
       <Outlet/>
      </div>
      </div>
    </Layout>
  )
}

export default Dashboard