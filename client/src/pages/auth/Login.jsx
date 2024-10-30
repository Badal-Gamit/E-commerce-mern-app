import React,{useEffect} from 'react'
import Layout from '../../component/layout/Layout'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector}  from 'react-redux'
import { setform,signIn } from '../../redux/Slice/api/form/loginform.js'


const Login = () => {
    const  data=useSelector((state)=>state.form)
    const dispatch=useDispatch()
    const navigation = useNavigate()

    const changeHandle = ({ target }) => {
        dispatch(setform({[target.name]:target.value})) 
    }

    const submitHandle = async (e) => {
        e.preventDefault()
      dispatch(signIn(data))
     
    }
useEffect(() => {
  if (localStorage.getItem('data')) {
    navigation('/')
  }
}, [localStorage.getItem('data')])



    return (
        <Layout>
     <div className=' max-w-md mx-auto p-3  border-2bg-white shadow-lg '>
     <h2 className="text-2xl font-bold mb-4">Login</h2>
     <form  onSubmit={submitHandle}>
          {/* Name Field */}
          <div className="mb-4 ">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="example@example.com"
              required
              onChange={changeHandle} value={data.email?data.email:""}    />
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
              onChange={changeHandle} value={data.password?data.password:""}  />
              <div className='mt-5 text-blue-700 hover:cursor-pointer'onClick={()=>navigation('/reset-password')} >forget password?</div>
       <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700 mt-5"
          >
          {data===true?"loading...":"Submit"}
          </button>
        
          </div>
          </form>
     </div>
           
        </Layout>
    )
}

export default Login