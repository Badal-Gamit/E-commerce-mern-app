import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const Profile = () => {
const [form, setform] = useState({})

useEffect(() => {
  const userid=localStorage.getItem('data');
  const {user}=JSON.parse(userid)
setform(user)
}, [localStorage.getItem('data')])


const changeHandle=({target})=>{

setform((form)=>{return {...form,[target.name]:target.value} })

}
const submitHandle=async(e)=>{
e.preventDefault()
try {
  const Token=localStorage.getItem('data')
         const  userToken=JSON.parse(Token)
         const header={headers: {
           'Authorization':  userToken?.user?`Bearer ${userToken.token}`:"" }}
 const {status,data }= await axios.post(`https://e-commerce-mern-app-t2gp.onrender.com/user/update`,form,header)
  if (status==200) {
    localStorage.setItem('data',JSON.stringify(data))
    toast.success(data.message)
  }
 } catch (error) {
   toast.error(error.message)
   console.log(error)
}


}
  return (
    <div  className='flex items-center justify-center w-[70vw] pt-14' >
    <div className='w-96 ' >
       <div className="max-w-md mx-auto  p-2 bg-white shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold mb-4">update profile</h2>
        <form  onSubmit={submitHandle}>
          {/* Name Field */}
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
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="example@example.com"
              required
              onChange={changeHandle} value={form.email?form.email:""}   disabled  />
          </div>
            
          {/* Address Field */}
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

          {console.log(form) }

          {/* Phone Number Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="123-456-7890"
              required
              onChange={changeHandle} value={form.phoneNumber?form.phoneNumber:""}  />
          </div>
          {/* Password Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
           update
          </button>
        </form>
     
      </div>
    </div>
    </div>
  )
}

export default Profile