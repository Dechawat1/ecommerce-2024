// rafce
// rfce
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
function MainNav() {
  // Javascript
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((e) => e.user);
  const logout = useEcomStore((e) => e.logout);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-300">
      <div className="mx-auto pl-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <NavLink to={"/"} className="text-2xl font-bold">
              LOGO
            </NavLink>

            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Shop
            </NavLink>
            {/* Badge */}

            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Cart
              {carts.length > 0 && (
                <span
                  className="absolute top-0
               bg-red-500 rounded-full px-2"
                >
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-3 hover:bg-green-200 px-2 py-3 rounded-md"
                >
                  <img
                    className="w-9 h-9"
                    src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-36-116394.png?f=webp&w=256"
                  />

                  <ChevronDown />
                </button>
                {isOpen && (
                  <div className="absolute top-16 bg-green-300 shadow-md z-50 w-full">
                    <Link
                      to={"/user/history"}
                      className="block px-2 py-2 hover:bg-green-400 w-full" 
                    >
                      History
                    </Link>
                    <Link
                      onClick={() => logout()}
                      className="block px-2 py-2 hover:bg-green-400 w-full"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Register
                </NavLink>

                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium mr-4"
                      : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium mr-4"
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
