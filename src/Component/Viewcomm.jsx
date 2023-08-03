import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';

const ViewComm = () => {
  let leadId = useParams().leadId;
  const [comm, setComm] = useState([]);
  const [load, setLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commPerPage = 5;
  const navigate = useNavigate();
  // const isAdmin = localStorage.getItem('email') === 'abhishek82904@gmail.com';
  const isAdmin=true;

  const getComm = async () => {
    // Simulate loading for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let { data } = await axios.get(`/api/comm/${leadId}`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('leadmanager')}`,
      },
    });
    
    setComm(data.comm);
    setLoad(false);
  };

 let deleteComm = async (commId) => {
    await axios.delete(`/api/comm/${commId}`);
    getComm();
  };
  useEffect(() => {
    getComm();
  }, []);

  const indexOfLastComm = currentPage * commPerPage;
  const indexOfFirstComm = indexOfLastComm - commPerPage;
  const currentComm = comm.filter((item) =>
    item.lead_id.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstComm, indexOfLastComm);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddComm = () => {
    navigate(`/addcomm`); // Assuming the path to add communication is '/addcomm'
  };

  return (
    <div className="mx-auto max-w-2xl p-4 border rounded-lg shadow-lg bg-white">
      {load && <h3>Loading....</h3>}
      {!load && comm.length === 0 && <h3>No Communication History for this lead</h3>}
      {isAdmin && (
            <button
              onClick={handleAddComm}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
            >
              Add Communication
            </button>
          )}
      {!load && comm.length > 0 && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className='px-4 py-2'>Content</th>
                {isAdmin && <th className="px-4 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {currentComm.map((com) => (
                <tr key={com._id}>
                  <td className="border px-4 py-2">{com.lead_id.name}</td>
                  <td className="border px-4 py-2">{com.date_time}</td>
                  <td className="border px-4 py-2">{com.type}</td>
                  <td className="border px-4 py-2">{com.content}</td>

                  {isAdmin && <td className="border px-4 py-2">
                  <Link to={`/editcomm/${com._id}`}><AiTwotoneEdit className="w-7 h-6 border-1 rounded bg-blue-800 text-white text-2xl inline-block py-[2px] cursor-pointer" /></Link>
                <RiDeleteBin6Line
                  className="w-7 h-6 border-1 rounded bg-red-600 text-white inline-block py-[2px] ml-1 cursor-pointer"
                  onClick={deleteComm.bind(this, com._id)}
                />
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Pagination
              totalItems={comm.filter((item) => item.lead_id.name.toLowerCase().includes(searchTerm.toLowerCase())).length}
              itemsPerPage={commPerPage}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ViewComm;
