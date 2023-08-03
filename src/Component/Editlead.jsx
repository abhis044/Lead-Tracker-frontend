import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Editlead = () => {
  let leadId = useParams().leadId;
  console.log(leadId);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    source: "",
  })
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
  }
  let validateEmail = (event) => {
    setLead({ ...lead, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value) || event.target.value.trim() == ""
      ? setLeadError({ ...leadError, emailError: "Enter a proper Email" })
      : setLeadError({ ...leadError, emailError: "" });
  }
  let validatePhone = (event) => {
    setLead({ ...lead, phone: event.target.value });
    let regExp = /^[0-9]+$/;
    !regExp.test(event.target.value)
      ? setLeadError({ ...leadError, phoneError: "Enter a proper Phone number" })
      : setLeadError({ ...leadError, phoneError: "" });
  }
  let validateCity = (event) => {
    setLead({ ...lead, city: event.target.value });
    let regExp = /^[a-zA-Z]/;
    !regExp.test(event.target.value)
      ? setLeadError({ ...leadError, cityError: "Enter a proper Cityname" })
      : setLeadError({ ...leadError, cityError: "" });
  }
  let validateSource = (event) => {
    setLead({ ...lead, source: event.target.value });
  }

  let updateInformation = async () => {
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
    const { data } = await axios.put(`/api/${leadId}`, lead, {
      headers: { "Content-Type": "application/json" },
    });
    Swal.fire(data.msg, "", "success");
    // naviagte("/new");
  }

  let getlead = async () => {
    const { data } = await axios.get(`/api/${leadId}`);
    console.log(data);
    setLead({
      name: data.lead.name,
      email: data.lead.email,
      phone: data.lead.phone,
      city: data.lead.city,
      source: data.lead.source,
    })
  }
  useEffect(() => {
    getlead();
  }, [])

  return (
    <div className="mx-auto max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Edit Lead</h2>
      <form
        onSubmit={updateInformation}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
            value={lead.name}
            onChange={validateName}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
            value={lead.email}
            onChange={validateEmail}
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone"
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
            value={lead.phone}
            onChange={validatePhone}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="City"
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
            value={lead.city}
            onChange={validateCity}
          />
        </div>
        <div className="mb-4">
          <select
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={validateSource}
            required
            value={lead.source}
          >
            <option disabled selected>--SELECT SOURCE--</option>
            <option value="call">Call</option>
            <option value="website">Website</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editlead