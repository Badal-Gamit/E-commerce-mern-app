import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file
import { Store } from './redux/Store.js'
import {Provider}   from 'react-redux'
  
createRoot(document.getElementById('root')).render(
 < BrowserRouter>
  <StrictMode>
   <ToastContainer/> 
   <Provider store={Store} >
 <App />
 </Provider>
  </StrictMode>
  </BrowserRouter>
)
