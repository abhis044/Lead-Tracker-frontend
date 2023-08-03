import React, { useEffect } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteLead } from '../App';

const Leadinfo = (prop) => {
  return (
    <div className="pt-20 pl-10 h-[500px]">
      <div className="w-[1400px]  pt-5 px-5  bg-white rounded-lg drop-shadow-2xl">
        <div className=" bg-blue-900 h-12 w-24 flex justify-center rounded-lg">
          <button className="text-white">
            <Link to="/addlead">Add Lead</Link>
          </button>
        </div>
        <div className=" flex justify-end mt-6 h-10">
          <input type="text" placeholder="Search" className="ml-2 outline-none drop-shadow-lg border-b-2 border-black" />
        </div>
        <div className="mt-6">
          <table className="border-2 w-[1360px] border-gray-300 ">
            <thead className=" bg-gray-50 border-2 border-gray-200 h-16">
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid w-10">
                #
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid w-64">
                Lead Name
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid w-56">
                Email
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid w-40">
                Phone
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid">
                Source
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid">
                Status
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid w-40">
                Communication/Followup
              </th>
              <th className=" font-semibold p-2 tracking-wide text-left border-2 border-solid w-20">
                Action
              </th>
            </thead>
            {prop.data.length > 0 &&
              prop.data.map((lead) => {
                return (
                  <tbody className="border-2 border-gray-400 h-16">
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      {prop.data.indexOf(lead) + 1}
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      {lead.name}
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      {lead.email}
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      {lead.phone}
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      {lead.source}
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      {lead.Status}
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      <div className='flex justify-around'>
                        <button className=' border-0 rounded bg-blue-700 h-10 w-20'>Comm</button>
                        <button className='border-0 rounded bg-blue-700 h-10 w-20'>Followup</button>
                      </div>
                    </td>
                    <td className="p-2 tracking-wide text-left border-2 border-solid">
                      <Link to={`/edit/${lead._id}`}><AiTwotoneEdit className="w-7 h-6 border-1 rounded bg-blue-800 text-white text-2xl inline-block py-[2px] cursor-pointer" /></Link>
                      <RiDeleteBin6Line
                        className="w-7 h-6 border-1 rounded bg-red-600 text-white inline-block py-[2px] ml-1 cursor-pointer"
                        onClick={deleteLead.bind(this, lead._id)}
                      />
                    </td>
                  </tbody>
                );
              })}
          </table>
        </div>
        <div className="flex justify-between mt-3 items-center">
          <div>
            <span>Showing 1 to 5 Entries</span>
          </div>
          <div className="flex flex-row mb-2">
            <button className="border-2 h-10 w-20">Prev</button>
            <p className=" bg-blue-600 h-10 w-10 text-center pt-2 font-bold text-white">1</p>
            <button className="border-2 h-10 w-20">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leadinfo;