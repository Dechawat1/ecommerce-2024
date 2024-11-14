import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

{/* icon */}
import { IoLogOutSharp } from "react-icons/io5";
import { BsBoxFill,BsDatabaseFill,BsFillPersonLinesFill   } from "react-icons/bs";
import { FaDollyFlatbed,FaThLarge  } from "react-icons/fa";


import useEcomStore from '../../store/ecom-store';


const SidebarAdmin = () => {

  const navigate = useNavigate()
  const logout = useEcomStore((e) => e.logout);
  
  const handleOnClickLogout = ()=>{
    logout();
    navigate("/login");
  }
  return (
    <div className='bg-gray-800 w-64 text-gray-100 
    flex flex-col h-screen'>

      <div className='h-24 bg-gray-900 flex items-center
      justify-center text-2xl font-bold'>
        Admin Panel
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2'>
        <NavLink
          to={'/admin'}
          end
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <FaThLarge  className='mr-2' />
          Dashboard
        </NavLink>
        <NavLink
          to={'manage'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <BsFillPersonLinesFill   className='mr-2' />
          Manage
        </NavLink>


        <NavLink
          to={'category'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <BsDatabaseFill className='mr-2' />
          Category
        </NavLink>


        <NavLink
          to={'product'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <BsBoxFill   className='mr-2' />
          Product
        </NavLink>

        <NavLink
          to={'orders'}
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
          }
        >
          <FaDollyFlatbed className='mr-2' />
          Orders
        </NavLink>



        

      </nav>

          
      <div className='flex items-end px-4 py-4 space-y-2'>
        <button
        onClick={handleOnClickLogout}
        className='w-full text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'
        >
          <IoLogOutSharp className='mr-2' />
          Logout
        </button>
      </div>


    </div>
  )
}

export default SidebarAdmin