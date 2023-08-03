import React, { useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
  });
  let validateName = (event) => {
    setUser({ ...user, name: event.target.value });
    let regExp = /^[a-zA-Z0-9]/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, nameError: "Enter a valid Name" })
      : setUserError({ ...userError, nameError: "" });
  };
  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value) || event.target.value.trim() == ""
      ? setUserError({ ...userError, emailError: "Enter a valid Email" })
      : setUserError({ ...userError, emailError: "" });
  };
  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() == "")
      setUserError({ ...userError, passwordError: "Enter a proper Password" });
    else setUserError({ ...userError, passwordError: "" });
  };
  let validatephone = (event) => {
    setUser({ ...user, phone: event.target.value });
    let regExp = /^[0-9]/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, nameError: "Enter a proper Phone" })
      : setUserError({ ...userError, nameError: "" });
  };
  let submitsignup = async (event) => {
    event.preventDefault();
    let name = user.name;
    let email = user.email;
    let phone = user.phone;
    let password = user.password;

    const { status } = await axios.post(
      "/api/users/register",
      { name, email, phone, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (status == 201) {
      Swal.fire("User already exists", "", "error");
      return;
    } else if (status == 200) {
      Swal.fire("Registration successful", "", "success");
    }
  };
  return (
    <div className="">
      <div className="w-full p-4">
        <form action=""
          onSubmit={submitsignup}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 rounded border border-gray-300 mb-4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            onChange={validateName}
            value={user.name}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border border-gray-300 mb-4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            onChange={validateEmail}
            value={user.email}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-3 py-2 rounded border border-gray-300 mb-4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            onChange={validatephone}
            value={user.phone}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 rounded border border-gray-300 mb-4 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={user.password}
            onChange={validatePassword}
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp