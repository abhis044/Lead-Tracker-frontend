import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const Editfollowup = () => {
  const { followid } = useParams();
  const navigate = useNavigate();
  const [followup, setFollowup] = useState({
    description: '',
    date: '',
    status: '',
  });

  useEffect(() => {
    // Fetch the follow-up data by ID from the server
    const getFollowupData = async () => {
      try {
        const { data } = await axios.get(`/api/follow/followup/${followid}`, {
          headers: {
            'Content-Type': 'application/json',
            // Add your authorization header if needed
          },
        });
        // Update the state with the fetched follow-up data
        setFollowup(data.follow);
      } catch (error) {
        console.error('Error fetching follow-up data:', error);
        Swal.fire('Something went wrong');
      
      }
    };

    getFollowupData();
  }, [followid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFollowup({ ...followup, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.put(`/api/follow/${followid}`, followup, {
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization header if needed
        },
      });

      if (status === 200) {
        Swal.fire('Follow-up data updated successfully', '', 'success');
        // Redirect to the desired page after updating the data
        // navigate('/desired-page');
      } else {
        Swal.fire('Something went wrong');
      }
    } catch (error) {
      console.error('Error updating follow-up data:', error);
      Swal.fire('Something went wrong');
    }
  };

  return (
    <div className="mx-auto my-5 max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Edit Follow-up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="date"
            name="date"
            required
            value={followup.due_date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Status"
            name="status"
            required
            value={followup.Status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            name="description"
            required
            value={followup.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Follow-up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editfollowup;
