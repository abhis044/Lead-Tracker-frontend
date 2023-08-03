import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Addlead = () => {
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    Status: "",
    city: "",
  });
  let [leadError, setLeadError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    cityError:"",
  });
  let validateName = (event) => {
    setLead({ ...lead, name: event.target.value });
    let regExp = /^[a-zA-Z]/;
    !regExp.test(event.target.value)
      ? setLeadError({ ...leadError, nameError: "Enter a proper leadname" })
      : setLeadError({ ...leadError, nameError: "" });
  };
  let validateEmail = (event) => {
    setLead({ ...lead, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value) || event.target.value.trim() == ""
      ? setLeadError({ ...leadError, emailError: "Enter a proper Email" })
      : setLeadError({ ...leadError, emailError: "" });
  };
  let validatePhone = (event) => {
    setLead({ ...lead, phone: event.target.value });
    let regExp = /^[0-9]+$/;
    !regExp.test(event.target.value)
      ? setLeadError({ ...leadError, phoneError: "Enter a proper Phone number" })
      : setLeadError({ ...leadError, phoneError: "" });
  };
  let validateSource = (event) => {
    setLead({ ...lead, source: event.target.value });
  };
  let validateStatus = (event) => {
    setLead({ ...lead, Status: event.target.value });
  };
  let validateCity = (event) => {
    setLead({ ...lead, city: event.target.value });
    let regExp = /^[a-zA-Z]/;
    !regExp.test(event.target.value)
      ? setLeadError({ ...leadError, cityError: "Enter a proper Cityname" })
      : setLeadError({ ...leadError, cityError: "" });
  };
  let submitInformation = async () => {
    if(leadError.nameError!=""){
      Swal.fire(leadError.nameError);
      return;
    }
    if(leadError.emailError!=""){
      Swal.fire(leadError.emailError);
      return;
    }
    if(leadError.phoneError!=""){
      Swal.fire(leadError.phoneError);
      return;
    }
    if(leadError.cityError!=""){
      Swal.fire(leadError.cityError);
      return;
    }
    let name = lead.name;
    let email = lead.email;
    let phone = lead.phone;
    let source = lead.source;
    let Status = lead.Status;
    let city = lead.city;
    const {status} = await axios.post(
      "/api/addlead",
      { name, email, phone, source, Status, city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   if (status == 200) {
      Swal.fire("Lead inserted successful", "", "success");
       navigate("/");
       console.log("abhishek");
    }
    else{
      Swal.fire("Something Went Wrong");
    }  
  };
  return (
    <div className="flex justify-center mt-20">
      <div className="w-[1400px] h-[500px]  bg-white rounded-lg drop-shadow-md">
        <form
          action=""
          className="m-8 grid grid-cols-2 gap-4"
          onSubmit={submitInformation}
        >
          <div className="flex flex-col ">
            <label htmlFor="">Lead Name</label>
            <input
              type="text"
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              placeholder="Lead Name"
              required
              value={lead.name}
              onChange={validateName}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              placeholder="Email"
              required
              value={lead.email}
              onChange={validateEmail}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Phone</label>
            <input
              type="text"
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              placeholder="Phone"
              required
              value={lead.phone}
              onChange={validatePhone}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Source</label>
            <select
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              onChange={validateSource}
              required
            >
              <option disabled selected>
                --SELECT SOURCE--
              </option>
              <option>Call</option>
              <option>Organic</option>
              <option>Social Media</option>
              <option>Website</option>
              <option>Failed</option>
              <option>Camaign</option>
            </select>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">Status</label>
            <select
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              onChange={validateStatus}
              required
            >
              <option disabled selected>
                --SELECT STATUS--
              </option>
              <option>New</option>
              <option>Working</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Failed</option>
              <option>Closed</option>
            </select>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="">City</label>
            <input
              type="text"
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              placeholder="City"
              required
              value={lead.city}
              onChange={validateCity}
            />
          </div>
          <button className="flex float-left bg-blue-900 h-10 w-20 text-white cursor-pointer border-1 rounded justify-center items-center mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addlead;
