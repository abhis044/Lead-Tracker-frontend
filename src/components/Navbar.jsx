import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("Lead");
  };
  let user = JSON.parse(localStorage.getItem("Lead"));
  if (user) user = user.usernameoremail;
  return (
    <div>
      <div className="bg-blue-900 h-[10vh] flex justify-between">
        <div className="w-56 block bg-white border-y-[3px] border-black">
          <p className="font-bold text-2xl text-center">LEAD MANAGEMENT</p>
        </div>
        <div className="items-center flex pr-6">
          {
            user &&
            <button className="bg-gray-300 rounded h-10 w-24 mr-2"
              onClick={logout}>
              <Link to="/">
                Logout
              </Link>
            </button>}
          {!user && <div>
            <button className="bg-green-600 rounded h-10 w-24 mr-2">
              <Link to="/register">
                Register
              </Link>
            </button>
            <button className="bg-red-600 rounded h-10 w-24 ml-2">
              <Link to="/login">
                Login
              </Link>
            </button>
          </div>
          }
        </div>
      </div>
      {!user && <div className="flex flex-col bg-red-600 h-[90vh] items-center">
        <div className="flex justify-center m-2 "><h4>Welcom in Lead Website</h4></div>
        <div className="flex justify-center">We here Help you to Save Leads,Communication Histories And Setup Follow up Schedules</div>
      </div>}
    </div>
  );
};

export default Navbar;
