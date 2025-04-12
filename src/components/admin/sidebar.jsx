import { logoutUser } from "../../store/slices/authSlice";
import { menuItems } from "../../config/menuItems";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();


    // const handleLogout = () => {
    //   dispatch(logoutUser)
    // }

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 mb-2 rounded-md hover:bg-blue-700 ${
              location.pathname === item.path ? "bg-blue-700" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <button
        className="mt-auto bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
