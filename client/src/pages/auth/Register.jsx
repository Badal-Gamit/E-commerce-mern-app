import React from 'react'
import Layout from '../../component/layout/Layout.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import  {setRegistration,registrationform}  from '../../redux/Slice/api/form/registrationform.js'
 

const Register = () => {
  const form=useSelector((state)=>state.register)
  const dispatch=useDispatch()
  const navigation=useNavigate()

const changeHandle=({target})=>{
   dispatch(setRegistration({[target.name]:target.value}))
}

const submitHandle=async(e)=>{
  e.preventDefault()
dispatch(registrationform(form))
  navigation('/')
}

  return (
    <Layout>

      <div className="max-w-md mx-auto  p-2 bg-white shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
        <form  onSubmit={submitHandle}>
    
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
              required
              onChange={changeHandle} value={form.name?form.name:""}   />
          </div>
            
         
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="123 Main St"
              required
              onChange={changeHandle} value={form.address?form.address:""} />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="example@example.com"
              required
              onChange={changeHandle} value={form.email?form.email:""}    />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="123-456-7890"
              required
              onChange={changeHandle} value={form.phone?form.phone:""}  />
          </div>
          <div className="mb-4 ">
            <label htmlFor="answer" className="block text-gray-700 font-semibold mb-2">your secret</label>
            <input
              type="text"
              id="answer"
              name="answer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="example@your fav movie"
              required
              onChange={changeHandle} value={form.answer?form.answer:""}    />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="********"
              required
              onChange={changeHandle} value={form.password?form.password:""}  />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
          {form===true?"loading...":"Submit" }
          </button>
        </form>
     
      </div>
</Layout>
  )
}

export default Register