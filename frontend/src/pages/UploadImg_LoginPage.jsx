import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveImageToMongoDB, uploadImageToFirebase } from '../Controllers/imageController';

const UploadImg_LoginPage = ({ folder }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrls, setImageUrls] = useState({
        loginBackground: 'https://via.placeholder.com/800x600?text=Login+Background', // Placeholder for login background
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (imageType) => {
        if (selectedFile) {
            const imageUrl = await uploadImageToFirebase(selectedFile, 'login'); // Specify the folder for upload
            if (imageUrl) {
                // Save the new image URL to MongoDB
                saveImageToMongoDB({ folder: 'login', imageType, imageUrl });

                // Dynamically update the image in the UI
                setImageUrls((prevUrls) => ({
                    ...prevUrls,
                    [imageType]: imageUrl,
                }));
                alert('Image uploaded successfully!');
            }
        }
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
                setUser({ email: response.user.email, role: response.user.role });
            }, 1000);

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
                {/* Left Side: Image Upload */}
                <div className="relative flex items-center justify-center w-full md:w-1/2">
                    <img 
                        src={imageUrls.loginBackground} 
                        alt="Login Background" 
                        className="object-cover w-full h-full" 
                    />
                    {/* Edit Image Button */}
                    <div className="absolute flex flex-col items-center top-4 right-4">
                        <label className="relative block">
                            <input type="file" onChange={handleFileChange} className="hidden" />
                            <span className="absolute inset-0 flex items-center justify-center px-4 py-2 text-xs font-bold text-white transition-opacity duration-300 bg-green-600 rounded cursor-pointer opacity-90 hover:opacity-100">
                                Edit
                            </span>
                        </label>
                        <button
                            onClick={() => handleUpload('loginBackground')}
                            className="block px-6 py-3 mt-2 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded opacity-90 hover:opacity-100"
                        >
                            Upload
                        </button>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex items-center justify-center w-full p-6 md:w-1/2">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        {/* Error and Success Messages */}
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

                        {/* Create Account */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">New to SUMUD? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadImg_LoginPage;
