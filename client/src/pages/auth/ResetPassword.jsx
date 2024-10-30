import React from 'react'
import Layout from '../../component/layout/Layout.jsx'
import {  useNavigate } from 'react-router-dom'
import {useDispatch,useSelector}  from 'react-redux'
import { passwordReset,setPassword } from '../../redux/Slice/api/form/resetForm.js'
 
const ResetPassword = () => {

   const form=useSelector((state)=>state.resetform)
   const dispatch=useDispatch()
    const navigation = useNavigate()

    const changeHandle = ({ target }) => {
         dispatch(setPassword({[target.name]:target.value}))
       }

    const submitHandle = async (e) => {
        e.preventDefault()
        dispatch(passwordReset(form))
       navigation('/')
    }



    return (
        <Layout>
     <div className=' max-w-md mx-auto p-3  border-2bg-white shadow-lg '>
     <h2 className="text-2xl font-bold mb-4">Login</h2>
     <form  onSubmit={submitHandle}>
      
          <div className="mb-4 ">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="example@example.com"
              required
              onChange={changeHandle} value={form?.email?form.email:""}    />
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
              onChange={changeHandle} value={form?.answer?form.answer:""}    />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">new Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="********"
              required
              onChange={changeHandle} value={form?.newPassword?form.newPassword:""}  />
            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700 mt-5"
          >
          Reset
          </button>

          </div>
          </form>
          {console.log(form)}
     </div>
           
        </Layout>
    )
}

export default ResetPassword


