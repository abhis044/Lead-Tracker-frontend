import React, { useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
const SignIn = () => { 
  const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
      let validateemail = (event) => {
        setUser({ ...user, email: event.target.value });
      }
      let validatePassword = (event) => {
        setUser({ ...user, password: event.target.value });
      }
      let submitsigin = async (event) => {
        event.preventDefault();
        let email = user.email;
        let password = user.password;
    
        const { status, data } = await axios.post(
          "/api/users/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (status == 201) {
          Swal.fire("Invalid credentials", "", "error");
        } else if (status == 200) {
          Swal.fire("Login successful", "", "success");
          localStorage.setItem("User", JSON.stringify(data));
          navigate("/Leads");
        }
      }
  return (
    <div className="">
      <div className="w-full p-4">
      <form action=""
      onSubmit={submitsigin}>
      <input
          type="text"
          placeholder="Email"
          className="w-full px-3 py-2 rounded border border-gray-300 mb-4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          onChange={validateemail}
          value={user.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 rounded border border-gray-300 mb-4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          onChange={validatePassword}
          value={user.password}
        />
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </form>
      </div>
    </div>
  )
}

export default SignIn