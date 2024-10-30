import React from 'react';
import { useNavigate,NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navigation=useNavigate()

  return (
    <div className="flex flex-col  min-h-[83vh] p-3 bg-gray-800 shadow w-60 sticky top-20">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white"><NavLink to='' > Dashboard</NavLink></h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            
          <li className="rounded-sm">
              <NavLink to="CreateCatogry"className={({isActive})=>isActive?"flex items-center p-2 space-x-3 rounded-md text-white underline "  :"flex items-center p-2 space-x-3 rounded-md text-white"  }>
                <span>create Catgory</span>
              </NavLink>
              </li>
              <li className="rounded-sm">
              <NavLink to="CreateProduct" className={({isActive})=>isActive?"flex items-center p-2 space-x-3 rounded-md text-white underline "  :"flex items-center p-2 space-x-3 rounded-md text-white"  }>
                <span>Create product</span>
              </NavLink>
            </li>
            <li className="rounded-sm">
              <NavLink to="products"className={({isActive})=>isActive?"flex items-center p-2 space-x-3 rounded-md text-white underline "  :"flex items-center p-2 space-x-3 rounded-md text-white"  }>
                <span>product List</span>
              </NavLink>
            </li>
            <li className="rounded-sm">
              <NavLink to="User-order" className={({isActive})=>isActive?"flex items-center p-2 space-x-3 rounded-md text-white underline "  :"flex items-center p-2 space-x-3 rounded-md text-white"  }>
                <span>order-list</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
