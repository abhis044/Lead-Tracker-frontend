import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const Editlead = () => {
    let naviagte = useNavigate();
    let leadId=useParams().leadId;
    const [lead, setLead] = useState({
        name:"",
        email:"",
        phone:"",
        source:"",
        Status:"",
        city:"",
     })
     let validateName=(event)=>{
         setLead({ ...lead, name: event.target.value });
     }
     let validateEmail=(event)=>{
         setLead({ ...lead, email: event.target.value });
     }
     let validatePhone=(event)=>{
         setLead({ ...lead, phone: event.target.value });
     }
     let validateSource=(event)=>{
         setLead({ ...lead, source: event.target.value });
     }
     let validateStatus=(event)=>{
         setLead({ ...lead, Status: event.target.value });
     }
     let validateCity=(event)=>{
         setLead({ ...lead, city: event.target.value });
     }
     let updateInformation=async()=>{
        const {data} = await axios.put(`/api/${leadId}`, lead, {
            headers: { "Content-Type": "application/json" },
          });
          // Swal.fire(data.msg, "", "success");
          naviagte("/new");
     }

     let getlead=async()=>{
        const { data } = await axios.get(`/api/${leadId}`);
        setLead({
            name:data.lead.name,
            email:data.lead.email,
            phone:data.lead.phone,
            source:data.lead.source,
            Status:data.lead.Status,
            city:data.lead.city,
        })
     }
     useEffect(() => {
      getlead();
     }, [])
     
  return (
    <div className="flex justify-center mt-20">
    <div className="w-[1400px] h-[500px]  bg-white rounded-lg drop-shadow-md">
    <form action="" className="m-6 grid grid-cols-2 gap-4" onSubmit={updateInformation}>
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
      <label htmlFor="">Status</label>
          <select
              className=" bg-transparent outline-none border-solid border-2 my-3 px-2 h-10"
              onChange={validateSource}
              required
              value={lead.source}
            >
              {/* <option disabled selected>--SELECT STATUS--</option> */}
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
              value={lead.Status}
            >
              {/* <option disabled selected>--SELECT STATUS--</option> */}
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
      <button className="flex float-left bg-blue-700 h-10 w-20 text-white cursor-pointer border-1 rounded justify-center items-center mt-4">Update</button>
    </form>
  </div>
</div>
  )
}

export default Editlead