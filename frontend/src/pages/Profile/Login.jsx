// components/Login.js

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Controllers/userController';
import { UserContext } from '../../Contexts/userContext';
import { fetchImageUrlById } from '../../Controllers/ImagesControllers/pictureController';

const BASE_URL = 'https://saletracker-backend.onrender.com/api';
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext)
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Log the User In
            const response = await loginUser(formData); // Call the controller function
            console.log(response);
            

            // Store the email and role in local storage and update the context
            localStorage.setItem("email", formData.email);
            localStorage.setItem("role", response.user.role); // Store
            
            setSuccess('Login successful! Redirecting...');
            console.log(response.user.role);
            
            

            setTimeout(() => {
                setUser({email: response.user.email, role: response.user.role })
            }, 1000)


            // Updating User State 
            setLoading(false);



            // Navigate to the dashboard or home page after successful login
            setTimeout(() => {
                if (response.user.role === 'admin') {
                    navigate('/admin-dashboard'); // Redirect to admin dashboard
                } else {
                    navigate('/dashboard'); // Redirect to regular dashboard
                }
            }, 2000); // Navigate after 2 seconds

        } catch (err) {
            setError(err.message); // Set error message if login fails
            setLoading(false);
        }
    };

    const fetchLatestImage = async () => {
        try {
            // Make a GET request to fetch the most recent image
            const response = await fetch(`${BASE_URL}/latest-image`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
      
            // Check if the request was successful
            if (response.ok) {
                const data = await response.json();
                if (data && data.imageUrl && data.imageId) {
                    setImageUrl(data.imageUrl); // Set the image URL in state
                    const latestImageId = data.imageId; // Get the image ID
                    // Optionally, fetch more details of the image by its ID if needed
                    const fetchedImage = await fetchImageUrlById(latestImageId);
                    console.log(fetchedImage); // Do something with the fetched image, if needed
                }
            } else {
                console.error('Failed to fetch the latest image: ', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching the latest image: ', error);
        }
      };
    
        useEffect(() => {
            fetchLatestImage();
        }, []);

    // Automatically clear error or success message after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setSuccess('');
        }, 5000); // Timeout set to 5 seconds

        return () => clearTimeout(timer); // Clear the timeout on component unmount
    }, [error, success]); // Run effect when error or success changes

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
            {/* Main Container */}
            <div className="flex flex-col w-full overflow-hidden bg-white rounded-lg shadow-md md:flex-row">
                {/* Left Side: Image */}
                <div className="relative w-full md:w-1/2">
                    <img
                        src={imageUrl || `https://saletracker-frontend.onrender.com/src/assets/images/food.png`} // replace with the path to your actual cassava image
                        alt="Egusi Soup with Cassava Flour"
                        className="object-cover w-full h-full"
                    />
                    {/* Optional Overlay on Image */}
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    {/* Website Logo */}
                    <div className="absolute top-0 left-0 p-4">
                        <h1 className="text-2xl font-bold tracking-wider text-white">Sumud</h1>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex flex-col justify-center w-full px-8 py-10 md:w-1/2 bg-gray-50">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Welcome to SUMUD</h2>
                    <p className="mb-6 text-sm text-center text-gray-500">Log in to your account</p>

                    {/* Display error or success message */}
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            {success}
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email/Username</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your email or username"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 transition border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 transition border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 font-bold text-white transition transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Separator */}
                        <div className="mt-4 text-sm text-center text-gray-400">or</div>

                        {/* Social Logins */}
                        <div className="flex justify-center mt-4 space-x-4">
                            <a href="#" className="text-gray-500 transition hover:text-blue-500">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-500 transition hover:text-blue-500">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </form>

                    {/* Create Account */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">New to SUMUD? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
