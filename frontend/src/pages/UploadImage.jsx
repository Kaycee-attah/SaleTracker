import React from 'react';
import { Link } from 'react-router-dom';

const UploadImages = () => {
  return (
    <div className="container p-8 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">Upload Images</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link to="/admin-dashboard/upload/homepage" className="block p-6 transition bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold">Upload to HomePage</h3>
          <p className="text-gray-600">Change the image displayed on the HomePage.</p>
        </Link>
        <Link to="/admin-dashboard/upload/login" className="block p-6 transition bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold">Upload to Login Page</h3>
          <p className="text-gray-600">Change the image displayed on the Login Page.</p>
        </Link>
        <Link to="/admin-dashboard/upload/register" className="block p-6 transition bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50">
          <h3 className="mb-2 text-xl font-semibold">Upload to Register Page</h3>
          <p className="text-gray-600">Change the image displayed on the Register Page.</p>
        </Link>
      </div>
    </div>
  );
};

export default UploadImages;
