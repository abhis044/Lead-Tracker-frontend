import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BiSolidLockOpenAlt } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import lead from "../img/lead.jpg";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    usernameError: "",
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
  let validateusername = (event) => {
    setUser({ ...user, username: event.target.value });
  };
  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    if (event.target.value.trim() == "")
      setUserError({ ...userError, passwordError: "Enter a proper Password" });
    else setUserError({ ...userError, passwordError: "" });
  };
  let submitRegistration = async (event) => {
    event.preventDefault();
    let name = user.name;
    let email = user.email;
    let username = user.username;
    let password = user.password;

    const { status } = await axios.post(
      "/api/users/register",
      { name, username, email, password },
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
      navigate("/login");
    }
  };
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
          className=" ml-24 w-100 rounded-lg grid grid-cols-1 p-8 px-8"
          action=""
          onSubmit={submitRegistration}
        >
          <h1 className="mb-2 text-5xl"> Register for Your Account</h1>
          <p className="mb-14 text-xl">Enter Your Details to Register.</p>
          <div className=" flex flex-right w-[440px] bg-white border-solid border-2 border-[#ddd]  px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <FaUserAlt className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              placeholder="Enter Your Name"
              required
              value={user.name}
              onChange={validateName}
            />
          </div>
          <div className=" flex flex-right w-[440px] bg-white border-solid border-2 border-[#ddd] px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <MdOutlineEmail className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              placeholder="Enter Your Email"
              required
              value={user.email}
              onChange={validateEmail}
            />
          </div>
          <div className=" flex flex-right w-[440px] bg-white border-solid border-2 border-[#ddd] px-2 mt-2 mb-5">
            <div className="flex flex-col justify-center px-2">
              <FaUserAlt className="text-red-400 text-2xl" />
            </div>
            <input
              className="text-xl py-4 px-3 tracking-widest outline-none bg-transparent"
              type="text"
              placeholder="Username"
              required
              value={user.username}
              onChange={validateusername}
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
              value={user.password}
              onChange={validatePassword}
            />
          </div>
          <div>
            <input
              type="submit"
              className="border-solid border-2 bg-red-600 w-28 px-2 py-3 my-4 text-xl font-medium cursor-pointer "
              value="Register"
            />
          </div>
          <p className=" text-lg">
            Already have an account ?{" "}
            <Link to="/login" className="text-red-400">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
