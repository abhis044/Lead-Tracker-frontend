import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const Addlead = () => {
  // const navigate = useNavigate();
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    source: "",
  });
  let [leadError, setLeadError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    cityError: "",
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
  let validateCity = (event) => {
    setLead({ ...lead, city: event.target.value });
    let regExp = /^[a-zA-Z]/;
    !regExp.test(event.target.value)
      ? setLeadError({ ...leadError, cityError: "Enter a proper Cityname" })
      : setLeadError({ ...leadError, cityError: "" });
  };
  let submitInformation = async () => {
    if (leadError.nameError != "") {
      Swal.fire(leadError.nameError);
      return;
    }
    if (leadError.emailError != "") {
      Swal.fire(leadError.emailError);
      return;
    }
    if (leadError.phoneError != "") {
      Swal.fire(leadError.phoneError);
      return;
    }
    if (leadError.cityError != "") {
      Swal.fire(leadError.cityError);
      return;
    }
    let name = lead.name;
    let email = lead.email;
    let phone = lead.phone;
    let city = lead.city;
    let source = lead.source;
    const { status } = await axios.post(
      "/api/addlead",
      { name, email, phone, city, source },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (status === 200) {
      Swal.fire("Lead inserted successful", "", "success");
      //  navigate("/");
      console.log("abhishek");
    }
    else {
      Swal.fire("Something Went Wrong");
    }
  };
  return (
    <div className="mx-auto my-5 max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Add Leads</h2>
      <form
        onSubmit={submitInformation}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            required
            value={lead.name}
            onChange={validateName}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={lead.email}
            onChange={validateEmail}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone"
            required
            value={lead.phone}
            onChange={validatePhone}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="City"
            required
            value={lead.city}
            onChange={validateCity}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <select
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={validateSource}
          >
            <option disabled selected>--SELECT SOURCE--</option>
            <option>Call</option>
            <option>Website</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Lead
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addlead