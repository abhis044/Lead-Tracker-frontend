import React,{useState} from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { BiSolidBusiness, BiChevronRight, BiChevronDown } from "react-icons/bi";
import { FcBusinessman } from "react-icons/fc";
import {TbStatusChange} from 'react-icons/tb'
const Sidebar = () => {
    const [businessarrow, setBusinessrrow] = useState(true);
    const [leadarrow, setLeadarrow] = useState(true);
    const [statusarrow, setStatusarrow] = useState(true)
  return (
    <div className="w-56 flex flex-col gap-6 h-[600px] pt-3 pl-3 bg-white">
    <div className="flex flex-row">
      <AiFillDashboard className="text-2xl mr-4" />
      <a href="/" className="text-gray-500 font-sams">
        Dashboard
      </a>
    </div>
    <div
      className="flex flex-row cursor-pointer"
      onClick={() => {
        setBusinessrrow(!businessarrow);
      }}
    >
      <BiSolidBusiness className="text-2xl mr-4" />
      <p className="text-gray-500 font-sams">Business Type</p>
      {businessarrow == true ? (
        <BiChevronRight className="text-2xl ml-10 mt-[2px] text-gray-500" />
      ) : (
        <BiChevronDown className="text-2xl ml-10 mt-[2px] text-gray-500" />
      )}
    </div>
    {businessarrow == false && (
      <ul className="grid grid-cols-1 gap-8 ml-7">
        <li className="text-gray-500">
          <a href="">Add Business Type</a>
        </li>
        <li className="text-gray-500">
          <a href="">Manage Business Type</a>
        </li>
      </ul>
    )}
    <div
      className="flex flex-row cursor-pointer"
      onClick={() => {
        setLeadarrow(!leadarrow);
      }}
    >
      <FcBusinessman className="text-2xl mr-4 text-black" />
      <p className="text-gray-500 font-sams">Lead</p>
      {leadarrow == true ? (
        <BiChevronRight className="text-2xl ml-[108px] mt-[2px] text-gray-500" />
      ) : (
        <BiChevronDown className="text-2xl ml-[108px] mt-[2px] text-gray-500" />
      )}
    </div>
    {leadarrow == false && (
      <ul className="grid grid-cols-1 gap-8 ml-7">
        <li className="text-gray-500">
          <a href="/addlead">Add Lead</a>
        </li>
        <li className="text-gray-500">
          <a href="/managelead">Manage Lead</a>
        </li>
      </ul>
    )}
   <div
      className="flex flex-row cursor-pointer"
      onClick={() => {
        setStatusarrow(!statusarrow);
      }}
    >
      <TbStatusChange className="text-2xl mr-4 text-black" />
      <p className="text-gray-500 font-sams">Lead Status</p>
      {statusarrow == true ? (
        <BiChevronRight className="text-2xl ml-[56px] mt-[2px] text-gray-500" />
      ) : (
        <BiChevronDown className="text-2xl ml-[56px] mt-[2px] text-gray-500" />
      )}
    </div>
    {statusarrow == false && (
      <ul className="grid grid-cols-1 gap-8 ml-7">
        <li className="text-gray-500">
          <a href="/new">New</a>
        </li>
        <li className="text-gray-500">
          <a href="/working">Working</a>
        </li>
        <li className="text-gray-500">
          <a href="/contacted">Contacted</a>
        </li>
        <li className="text-gray-500">
          <a href="/qualified">Qualified</a>
        </li>
        <li className="text-gray-500">
          <a href="/failed">Failed</a>
        </li>
        <li className="text-gray-500">
          <a href="/closed">Closed</a>
        </li>
      </ul>
    )}
  </div>
  )
}

export default Sidebar