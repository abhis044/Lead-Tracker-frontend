import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';

const ViewFollowup = () => {
  let leadId = useParams().leadId;
  const [followup, setFollowup] = useState([]);
  const [load, setLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const followupPerPage = 5;
  const navigate = useNavigate();
  // const isAdmin = localStorage.getItem('email') === 'abhishek82904@gmail.com';
  const isAdmin = true;

  const getFollowup = async () => {
    // Simulate loading for 2 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    let { data } = await axios.get(`/api/follow/${leadId}`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('leadmanager')}`,
      },
    });
    console.log(data);
    setFollowup(data.follow);
    setLoad(false);
  };
  let deletefollowup= async (followId) => {
    await axios.delete(`/api/follow/${followId}`);
    getFollowup();
  };
  useEffect(() => {
    getFollowup();
  }, []);

  const indexOfLastFollowup = currentPage * followupPerPage;
  const indexOfFirstFollowup = indexOfLastFollowup - followupPerPage;
  const currentFollowup = followup.filter((item) =>
    item.lead_id.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstFollowup, indexOfLastFollowup);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddFollowup = () => {
    navigate(`/addfollowup`); // Assuming the path to add follow-up is '/addfollowup'
  };

  return (
    <div className="mx-auto max-w-2xl p-4 border rounded-lg shadow-lg bg-white">
      {load && <h3>Loading....</h3>}
      {!load && followup.length === 0 && <h3>No Follow-up History for this lead</h3>}
      {isAdmin && (
        <button
          onClick={handleAddFollowup}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
        >
          Add Follow-up
        </button>
      )}
      {!load && followup.length > 0 && (
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
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFollowup.map((follow) => (
                <tr key={follow._id}>
                  <td className="border px-4 py-2">{follow.lead_id.name}</td>
                  <td className="border px-4 py-2">{follow.due_date}</td>
                  <td className="border px-4 py-2">{follow.Status}</td>
                  <td className="border px-4 py-2">{follow.description}</td>

                  <td className="border px-4 py-2">
                  <Link to={`/editfollowup/${follow._id}`}><AiTwotoneEdit className="w-7 h-6 border-1 rounded bg-blue-800 text-white text-2xl inline-block py-[2px] cursor-pointer" /></Link>
                <RiDeleteBin6Line
                  className="w-7 h-6 border-1 rounded bg-red-600 text-white inline-block py-[2px] ml-1 cursor-pointer"
                  onClick={deletefollowup.bind(this, follow._id)}
                />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Pagination
              totalItems={followup.filter((item) => item.lead_id.name.toLowerCase().includes(searchTerm.toLowerCase())).length}
              itemsPerPage={followupPerPage}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ViewFollowup;
