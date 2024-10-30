import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Privateroutes from './component/private/Privateroute'
import ResetPassword from './pages/auth/ResetPassword'
import AdminRoute from './component/private/AdminRoute'
import Admindashboard from './pages/admin/AdminDashboard'
import AdminHome   from  './pages/admin/AdminHome'
import CreateCatogry    from  './pages/admin/CreateCategory'
import CreateProduct    from  './pages/admin/CreateProduct'
import  User    from  './pages/admin/User'
import Dashboard from './pages/user/Dashboard'
import  Order  from  './pages/user/Order'
import Profile from  './pages/user/Profile'
import UserHome from  './pages/user/UserHome'
import Products from './pages/admin/Products'
import UpdateProduct from './pages/admin/UpdateProduct'
import  SearchBar   from './pages/user/Searchbar'
import ProductDetail from './pages/user/ProductDetail'
import Card from './pages/user/Card'

function App() {



  return (
    <>
      
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/card' element={<Card/>} />
      <Route path='/product/:detail' element={<ProductDetail/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/search' element={<SearchBar/>} />
    <Route path='/dashboard' element={<Privateroutes/>}>
         <Route path='user' element={<Dashboard/>}  >
         <Route path='' element={<UserHome/>} />
         <Route path='Order' element={<Order/>} />
         <Route path='Profile' element={<Profile/>} />
      </Route>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route  path='admin' element={<Admindashboard/>} >
         <Route path='' element={<AdminHome/>} />
         <Route path='CreateCatogry' element={<CreateCatogry/>} />
         <Route path='CreateProduct' element={<CreateProduct/>} />
         <Route path='User-order' element={<User/>} />
         <Route path='products' element={<Products/>} />
         <Route path='product/:id' element={<UpdateProduct/>} />
      </Route>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      <Route path='/*' element={<Pagenotfound/>} />
     </Routes>
    </>
  )
}

export default App
