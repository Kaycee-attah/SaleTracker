import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState("");
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userEmail) throw new Error('User email not found');

        const response = await fetch(`/api/current-user/${userEmail}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();

        setUser(data);
        setUserID(data._id);
        setFormData({ name: data.name, email: data.email });

        const adminResponse = await fetch(`/api/admin-user/id/${data._id}`);
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          setAdminUser(adminData);
          setFormData((prev) => ({
            ...prev,
            phone: adminData.phone || '',
            address: adminData.address || '',
            bio: adminData.bio || '',
          }));
          setImageUrl(adminData.imageUrl || "");
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setStatusMessage({ type: 'error', message: error.message });
      }
    };

    fetchUserData();
  }, [userEmail]);

  useEffect(() => {
    // Clear the status message after 5 seconds
    if (statusMessage.message) {
      const timer = setTimeout(() => {
        setStatusMessage({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('userId', userID);
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('address', formData.address);
    formDataToSubmit.append('bio', formData.bio);

    if (imageFile) {
      try {
        const storageRef = ref(storage, `Profile_Pictures/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(storageRef);
        setImageUrl(downloadURL);
        formDataToSubmit.append('imageUrl', downloadURL);
        console.log(downloadURL);
        
        setStatusMessage({ type: 'success', message: 'Image uploaded successfully!' });
      } catch (error) {
        console.error("Error uploading image:", error);
        setStatusMessage({ type: 'error', message: 'Error uploading image' });
        return; // Exit early if image upload fails
      }
    }

    try {
      console.log(formDataToSubmit);
      
      const response = await fetch('/api/admin-users', {
        method: 'POST',
        body: formDataToSubmit,
      });
      if (!response.ok) throw new Error('Failed to save profile');
      const updatedUser = await response.json();
      setAdminUser(updatedUser);
      setEditing(false);
      setStatusMessage({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setStatusMessage({ type: 'error', message: error.message });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-md min-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">User Profile</h2>

      {statusMessage.message && (
        <div className={`mb-4 p-4 text-white rounded-md ${statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {statusMessage.message}
        </div>
      )}

      <div className="flex items-center mb-6 space-x-8">
        <div className="flex flex-col items-center">
          <img
            src={imageUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="mb-4 rounded-full w-36 h-36"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="px-4 py-2 text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-600 focus:outline-none">
            Change Photo
          </label>
        </div>

        <div className="flex-1">
          {editing ? (
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Name</h3>
                <p>{formData.name}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p>{formData.email}</p>
              </div>
              {adminUser && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p>{adminUser.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p>{adminUser.address}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Bio</h3>
                    <p>{adminUser.bio}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
