import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Addfollowup = () => {
  const [followup, setFollowup] = useState({
    leadId:'64ca51a14d21599007ea1d6a',
    description: '',
    due_date: '',
    status: '',
  });
  const [followupError, setFollowupError] = useState({
    descriptionError: '',
    due_dateError: '',
    statusError: '',
  });

  const validateDescription = (event) => {
    setFollowup({ ...followup, description: event.target.value });
    if (!event.target.value.trim()) {
      setFollowupError({ ...followupError, descriptionError: 'Description is required' });
    } else {
      setFollowupError({ ...followupError, descriptionError: '' });
    }
  };

  const validateDate = (event) => {
    setFollowup({ ...followup, due_date: event.target.value });
    if (!event.target.value.trim()) {
      setFollowupError({ ...followupError, due_dateError: 'Date is required' });
    } else {
      setFollowupError({ ...followupError, due_dateError: '' });
    }
  };

  const validateStatus = (event) => {
    setFollowup({ ...followup, status: event.target.value });
    if (!event.target.value.trim()) {
      setFollowupError({ ...followupError, statusError: 'Status is required' });
    } else {
      setFollowupError({ ...followupError, statusError: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (followupError.descriptionError || followupError.due_dateError || followupError.statusError) {
      Swal.fire('Please fill all the required fields');
      return;
    }

    try {
      const { status } = await axios.post(
        '/api/follow/newfollow', // Change the API endpoint URL if needed
        followup,
        {
          headers: {
            'Content-Type': 'application/json',
            // Add your authorization header if needed
          },
        }
      );

      if (status === 200) {
        Swal.fire('Follow-up added successfully', '', 'success');
        // Redirect to the desired page after adding the follow-up
        // navigate('/desired-page');
      } else {
        Swal.fire('Something went wrong');
      }
    } catch (error) {
      console.error('Error adding follow-up:', error);
      Swal.fire('Something went wrong');
    }
  };

  return (
    <div className="mx-auto my-5 max-w-md p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Add Follow-up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            placeholder="Description"
            required
            value={followup.description}
            onChange={validateDescription}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {followupError.descriptionError && <p className="text-red-500">{followupError.descriptionError}</p>}
        </div>
        <div className="mb-4">
          <input
            type="date"
            required
            value={followup.due_date}
            onChange={validateDate}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {followupError.due_due_dateError && <p className="text-red-500">{followupError.dateError}</p>}
        </div>
        <div className="mb-4">
          <select
            required
            value={followup.status}
            onChange={validateStatus}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option disabled value="">
              --SELECT STATUS--
            </option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
          {followupError.statusError && <p className="text-red-500">{followupError.statusError}</p>}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Follow-up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addfollowup;
