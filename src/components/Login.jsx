import React, { useState, useEffect } from "react";
import lead from "../img/lead.jpg";
import { MdOutlineEmail } from "react-icons/md";
import { BiSolidLockOpenAlt } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    usernameoremail: "",
    password: "",
  });
  let validateUsername_or_Email = (event) => {
    setUser({ ...user, usernameoremail: event.target.value });
  }
  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  }
  let submitLogin = async (event) => {
    event.preventDefault();
    let usernameoremail = user.usernameoremail;
    let password = user.password;

    const { status, data } = await axios.post(
      "/api/users/login",
      { usernameoremail, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      });
    if (status == 201) {
      Swal.fire("Invalid credentials", "", "error");
    } else if (status == 200) {
      Swal.fire("Login successful", "", "success");
      localStorage.setItem("Lead", JSON.stringify(data));
      navigate("/home");
    }
  }
  return (
    <div className="grid grid-cols-2">
      <div className="h-screen w-full">
        <div className="flex flex-col justify-evenly h-full mx-12">
          <div>
            <h1 className="flex flex-col items-center text-5xl font-semibold">
              Lead mangement system
            </h1>
            <p className="text-xl tracking-widest font-sans text-[#666]">
              Lead Management is the process of acquiring and managing leads
              (potential customers) until the point where they make a purchase.
              This is a more involved process than standard advertising, and is
              most applicable to ecommerce stores that generate individual
              relationships with customers.
            </p>
          </div>
          <img className="w-full h-96" src={lead} alt="" />
        </div>
      </div>
      <div className="flex flex-col justify-center bg-gray-100">
        <form
          className=" ml-20 w-100 rounded-lg grid grid-cols-1 p-8 px-8"
          action=""
          onSubmit={submitLogin}
        >
          <h1 className="mb-2 text-5xl"> Login to Your Account</h1>
          <p className="mb-14 text-xl">Enter Your Details to Login.</p>
          <div className=" flex flex-right w-[440px] bg-white border-solid border-2 border-[#ddd] px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <MdOutlineEmail className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              placeholder="Username or Email"
              required
              onChange={validateUsername_or_Email}
              value={user.usernameoremail}
            />

          </div>
          <div className=" flex flex-right w-[440px] bg-white border-solid border-2 border-[#ddd] px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <BiSolidLockOpenAlt className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl text-black py-4 px-3 tracking-widest outline-none bg-transparent"
              type="password"
              placeholder="Password"
              required
              onChange={validatePassword}
              value={user.password}
            />
          </div>
          <button className="border-solid border-2 bg-red-600 w-28 px-2 py-3 my-4 text-xl font-medium">
            Sign In
          </button>
          <p className=" text-lg">
            Don't have an account ?{" "}
            <Link to="/register" className="text-red-400">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
