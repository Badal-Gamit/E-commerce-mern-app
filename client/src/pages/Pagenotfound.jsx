import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../component/layout/layout'
const Pagenotfound = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center flex-col h-[84vh]'>
      <h1 className='font-bold  text-7xl' >404</h1>
      <h3 className='text-4xl'>oops! page not found</h3>
     <div className='border-4 border-gray-700 p-2 m-2 rounded-lg'>
        <Link to={'/'} > Go Back</Link>
     </div>
      </div>
      </Layout>
  )
}

export default Pagenotfound