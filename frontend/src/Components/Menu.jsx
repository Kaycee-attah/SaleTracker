import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/app.css'; // Import your CSS file here
import { logoutUser } from '../Controllers/userController';
import { UserContext } from '../Contexts/userContext';

const Menu = () => {
  const BASE_URL = 'https://saletracker-backend.onrender.com/api';
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setUser } = useContext(UserContext)
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const userEmail = localStorage.getItem('email');

  // Function to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close menu if clicked outside the sidebar
  const closeMenuOnClickOutside = (e) => {
    if (e.target.closest('.sidebar') === null) {
      setIsMenuOpen(false);
    }
  };

  // Function to log users out
  const handleLogout = () => {
    const isLoggedOut = logoutUser(); // Call the logout function

    if (isLoggedOut) {
        // Updating User State 
        setUser({email: "" })
        navigate('/login'); // Redirect to login after logout
    }
};

useEffect(() => {
  const fetchUserData = async () => {
    try {
      if (!userEmail) throw new Error('User email not found');

      const response = await fetch(`${BASE_URL}/current-user/${userEmail}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();

      setUser(data);
      setName(data.name)
      
      const adminResponse = await fetch(`${BASE_URL}/admin-user/id/${data._id}`);
      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        
        setImageUrl(adminData.imageUrl || "");
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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

  return (
    <>
      {/* Mobile Hamburger Icon - Only visible when the sidebar is closed */}
      {!isMenuOpen && (
        <div className="fixed z-50 p-4 mb-6 top-4 left-4 md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <i className="text-2xl text-black fa-solid fa-bars"></i>
          </button>
        </div>
      )}

      {/* Sidebar Menu */}
      <aside
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 w-64 p-6 bg-gray-800 text-white transform transition-transform duration-300 md:relative md:translate-x-0 md:w-1/5 sidebar`}
      >
        <div className="flex justify-between mb-8">
          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <img
              src={imageUrl || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold">{name || "Liam Moore"}</h4>
              <p className="text-sm">{email || "liamore@gmail.com"}</p>
            </div>
          </div>

          {/* Close Icon - Only visible on mobile */}
          <button onClick={toggleMenu} className="text-white md:hidden">
            <i className="text-xl fa-solid fa-times"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-8">
          {/* Management Section - Now Scrollable */}
          <div className="h-64 pr-2 space-y-4 overflow-y-auto scroll-hidden">
            <h5 className="text-sm tracking-wide text-gray-400 uppercase">Management</h5>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-house"></i>
                <Link to="/admin-dashboard" className="text-lg font-medium cursor-pointer">Dashboard</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-plus"></i>
                <Link to="/admin-dashboard/add-expense" className="text-lg font-medium cursor-pointer">Add Expenses</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-list-check"></i>
                <Link to="/admin-dashboard/manage-expense" className="text-lg font-medium cursor-pointer">Manage Expenses</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-plus"></i>
                <Link to="/admin-dashboard/add-sales" className="text-lg font-medium cursor-pointer">Add Sales</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-list-check"></i>
                <Link to="/admin-dashboard/manage-sales" className="text-lg font-medium cursor-pointer">Manage Sales</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-plus"></i>
                <Link to="/admin-dashboard/add-batch" className="text-lg font-medium cursor-pointer">Add Batch</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-list-check"></i>
                <Link to="/admin-dashboard/manage-batches" className="text-lg font-medium cursor-pointer">Manage Batches</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-list-check"></i>
                <Link to="/admin-dashboard/add-categories" className="text-lg font-medium cursor-pointer">Add Expense Category</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-list-check"></i>
                <Link to="/admin-dashboard/add-sales-category" className="text-lg font-medium cursor-pointer">Add Sales Category</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-image"></i>
                <Link to="/admin-dashboard/upload-images" className="text-lg font-medium cursor-pointer">Upload Images</Link>
              </li>
            </ul>
          </div>

          {/* New Inventory Section */}
          <div className="space-y-4">
            <h5 className="text-sm tracking-wide text-gray-400 uppercase">Inventory</h5>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-box"></i>
                <Link to="/admin-dashboard/add-product" className="text-lg font-medium cursor-pointer">Add Product</Link>
              </li>
            </ul>
          </div>

          {/* Settings Section */}
          <div className="space-y-4">
            <h5 className="text-sm tracking-wide text-gray-400 uppercase">Settings</h5>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 hover:text-green-300">
                <i className="fa-solid fa-user"></i>
                <Link to="/admin-dashboard/user" className="text-lg font-medium cursor-pointer">Profile</Link>
              </li>
              <li className="flex items-center space-x-3 hover:text-red-400">
                <i className="fa-solid fa-right-from-bracket"></i>
                <div onClick={handleLogout} className="text-lg font-medium cursor-pointer">Logout</div>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={closeMenuOnClickOutside}
        ></div>
      )}
    </>
  );
};

export default Menu;
