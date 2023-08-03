import React, { useState } from 'react';
import Pagination from './Pagination';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteLead } from '../App';
const Managelead = ({ leads  }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.id.toString().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto m-4 max-w-7xl p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Leads</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Searchbar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 w-1/14">ID</th>
            <th className="px-4 py-2 w-3/14">Name</th>
            <th className="px-4 py-2 w-2/14">Email</th>
            <th className="px-4 py-2 w-1/12">Phone</th>
            <th className="px-4 py-2 w-2/14">City</th>
            <th className="px-4 py-2 w-1/14">Source</th>
            <th className="px-4 py-2 w-1/14">Comm</th>
            <th className="px-4 py-2 w-2/14">Follow-up</th>
            <th className="px-4 py-2 w-1/14">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.slice(indexOfFirstLead, indexOfLastLead).map((lead) => (
            <tr key={lead.id}>
              <td className="border px-4 py-2">{currentLeads.indexOf(lead)+1}</td>
              <td className="border px-4 py-2">{lead.name}</td>
              <td className="border px-4 py-2">{lead.email}</td>
              <td className="border px-4 py-2">{lead.phone}</td>
              <td className="border px-4 py-2">{lead.city}</td>
              <td className="border px-4 py-2">{lead.source}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                  <Link to={`/viewcomm/${lead._id}`}>Comm</Link>
                </button>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                <Link to={`/viewfollowup/${lead._id}`}>FollowUp</Link>
                </button>
              </td>
              <td className="border px-4 py-2">
                <Link to={`/editlead/${lead._id}`}><AiTwotoneEdit className="w-7 h-6 border-1 rounded bg-blue-800 text-white text-2xl inline-block py-[2px] cursor-pointer" /></Link>
                <RiDeleteBin6Line
                  className="w-7 h-6 border-1 rounded bg-red-600 text-white inline-block py-[2px] ml-1 cursor-pointer"
                  onClick={deleteLead.bind(this, lead._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination
          totalItems={currentLeads.length}
          itemsPerPage={leadsPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};


export default Managelead;
