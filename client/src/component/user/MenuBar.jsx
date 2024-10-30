import React from 'react';
import { NavLink } from 'react-router-dom';

const  MenuBar = () => {
  

  return (
    <div className="flex flex-col h-[84vh] p-3 bg-gray-800 shadow w-60">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white"><NavLink to=''>Dashboard</NavLink></h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            
            <li className="rounded-sm">
              <NavLink to="Profile" className={({isActive})=>isActive?"flex items-center p-2 space-x-3 rounded-md text-white underline "  :"flex items-center p-2 space-x-3 rounded-md text-white"  }>
                <span>Profile</span>
              </NavLink>
            </li>
            <li className="rounded-sm">
              <NavLink to="Order"className={({isActive})=>isActive?"flex items-center p-2 space-x-3 rounded-md text-white underline "  :"flex items-center p-2 space-x-3 rounded-md text-white"  }>
                <span>Order</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuBar ;
