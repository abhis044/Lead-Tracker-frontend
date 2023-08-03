import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Home = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleButtonClick = (isSignIn) => {
    setShowSignIn(isSignIn);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Lead Management</h1>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-around mt-6">
          <button
            className={`text-white px-4 py-2 rounded-lg w-full text-lg ${
              showSignIn ? 'bg-blue-600' : 'bg-gray-600'
            }`}
            onClick={() => handleButtonClick(true)}
          >
            Sign In
          </button>
          <button
            className={`text-white px-4 py-2 rounded-lg w-full ${
              !showSignIn ? 'bg-red-600' : 'bg-gray-600'
            }`}
            onClick={() => handleButtonClick(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="p-6 mt-6">
          {showSignIn ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Home;
