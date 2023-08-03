import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Addcomm = () => {
  const [comm, setComm] = useState({
    leadId:'64ca51a14d21599007ea1d6a',
    date_time: '',
    type: '',
    content: '',
  });
  const [commError, setCommError] = useState({
    typeError: '',
    date_timeError: '',
    contentError: '',
  });

  const validateType = (event) => {
    setComm({ ...comm, type: event.target.value });
    if (!event.target.value.trim()) {
      setCommError({ ...commError, typeError: 'Type is required' });
    } else {
      setCommError({ ...commError, typeError: '' });
    }
  };

  const validateDate = (event) => {
    setComm({ ...comm, date_time: event.target.value });
    if (!event.target.value.trim()) {
      setCommError({ ...commError, date_timeError: 'Date is required' });
    } else {
      setCommError({ ...commError, date_timeError: '' });
    }
  };

  const validateContent = (event) => {
    setComm({ ...comm, content: event.target.value });
    if (!event.target.value.trim()) {
      setCommError({ ...commError, contentError: 'Content is required' });
    } else {
      setCommError({ ...commError, contentError: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commError.typeError || commError.date_timeError || commError.contentError) {
      Swal.fire('Please fill all the required fields');
      return;
    }

    try {
      const { status } = await axios.post(
        '/api/comm/newcomm', // Change the API endpoint URL if needed
        comm,
        {
          headers: {
            'Content-Type': 'application/json',
            // Add your authorization header if needed
          },
        }
      );

      if (status === 200) {
        Swal.fire('Communication added successfully', '', 'success');
        // Redirect to the desired page after adding the communication
        // navigate('/desired-page');
      } else {
        Swal.fire('Something went wrong');
      }
    } catch (error) {
      console.error('Error adding communication:', error);
      Swal.fire('Something went wrong');
    }
  };

  return (
    <div className="mx-auto my-5 max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Add Communication</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Type"
            required
            value={comm.type}
            onChange={validateType}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {commError.typeError && <p className="text-red-500">{commError.typeError}</p>}
        </div>
        <div className="mb-4">
          <input
            type="date"
            required
            value={comm.date_time}
            onChange={validateDate}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {commError.date_timeError && <p className="text-red-500">{commError.date_timeError}</p>}
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            required
            value={comm.content}
            onChange={validateContent}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {commError.contentError && <p className="text-red-500">{commError.contentError}</p>}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Communication
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcomm;
