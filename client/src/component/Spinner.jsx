// Spinner.js
import React from 'react';
import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom'
const Spinner = () => {
const [count, setcount] = useState(5)
 const navigation=useNavigate()

useEffect(() => {
 
const countdown=setInterval(() => {
   setcount((previousvalue)=> previousvalue - 1 )
   }, 1000);
if (count<=0){
  clearInterval(countdown);
  navigation('/')
}    
console.log(count)
}, [count])


    return(<>
    <div className='flex justify-center items-center w-[100vw] h-[100vh] flex-col' >
      <div className="mess"> redirect to home page {count} second </div>
      <div >
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 50 50"
    xmlSpace="preserve"
    className="spinner"
  >
    <circle
      className="path"
      fill="none"
      stroke="#3498db"
      strokeWidth="4"
      strokeLinecap="round"
      cx="25"
      cy="25"
      r="20"
    />
    <style>
      {`
        .spinner {
          width: 50px;
          height: 50px;
        }
        .path {
          stroke-dasharray: 150;
          stroke-dashoffset: 0;
          animation: spin 1.5s ease-in-out infinite;
        }
        @keyframes spin {
          0% {
            stroke-dashoffset: 150;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}
    </style>
  </svg>
  </div>
    </div>
    

    </>)
};

export default Spinner;
