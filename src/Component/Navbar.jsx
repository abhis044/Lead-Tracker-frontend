import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdLogout,
} from "react-icons/md";
const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("User");
    navigate("/")
  };
  return (
    <nav className="flex justify-between items-center bg-blue-500 p-4">
      <h3 className="text-white text-2xl font-bold">Lead Management</h3>
      <div><Link to={"/leads"}><p>Leads</p></Link></div>
      <div>
        {user && user.email == "abhishek82904@gmail.com" &&
          <Link to={"/addlead"}>
            <p
              className="px-4 py-1 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
            >
              Add Lead <MdAdd />
            </p>
          </Link>}
        <p
          onClick={handleLogout}
          className="px-4 py-1 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
        >
          Logout <MdLogout />
        </p>


      </div>
    </nav>
  );
};

export default Navbar;
