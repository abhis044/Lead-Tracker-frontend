import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const Editcomm = () => {
  const { commId } = useParams();
  const navigate = useNavigate();
  const [comm, setComm] = useState({
    date: '',
    type: '',
    content: '',
  });

  useEffect(() => {
    // Fetch the communication data by ID from the server
    const getCommData = async () => {
      try {
        const { data } = await axios.get(`/api/comm/communication/${commId}`, {
          headers: {
            'Content-Type': 'application/json',
            // Add your authorization header if needed
          },
        });
        // Update the state with the fetched communication data
        setComm(data.comm);
      } catch (error) {
        console.error('Error fetching communication data:', error);
        Swal.fire('Something went wrong');
        // Redirect to the desired page if fetching data fails
        // navigate('/desired-page');
      }
    };

    getCommData();
  }, [commId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComm({ ...comm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.put(`/api/comm/${commId}`, comm, {
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization header if needed
        },
      });

      if (status === 200) {
        Swal.fire('Communication data updated successfully', '', 'success');
        // Redirect to the desired page after updating the data
        // navigate('/desired-page');
      } else {
        Swal.fire('Something went wrong');
      }
    } catch (error) {
      console.error('Error updating communication data:', error);
      Swal.fire('Something went wrong');
    }
  };

  return (
    <div className="mx-auto my-5 max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Edit Communication</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <input
            type="date"
            name="date"
            required
            value={comm.date_time}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type"
            name="type"
            required
            value={comm.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            name="content"
            required
            value={comm.content}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Communication
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editcomm;
