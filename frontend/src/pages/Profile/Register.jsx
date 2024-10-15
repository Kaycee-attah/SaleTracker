import React, { useContext, useState } from 'react';
import ParticleEffect from '../../Components/ParticleEffect';
import { registerUser } from '../../Controllers/userController';
import { UserContext } from '../../Contexts/userContext';

const Register = () => {
    const { setUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            const response = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });
            
            setSuccess('Registration successful!');
            setFormData({name: '', email: '', password: '', confirmPassword: ''})
            setTimeout(() => {
                setUser({email: formData.email })
            }, 1000)
            setError('');
            // Optionally store token or redirect user here
        } catch (err) {
            setError(err.message || 'Failed to register');
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
            {/* Main Container */}
            <div className="flex flex-col w-full overflow-hidden bg-white rounded-lg shadow-md md:flex-row">
                {/* Left Side: Image */}
                <div className="relative w-full md:w-1/2">
                    <img
                        src={`../../src/assets/images/food.png`} 
                        alt="Egusi Soup with Cassava Flour"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black opacity-40">
                        <ParticleEffect />
                    </div>
                    <div className="absolute top-0 left-0 p-4">
                        <h1 className="text-2xl font-bold tracking-wider text-white">Sumud</h1>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="flex flex-col justify-center w-full px-8 py-10 md:w-1/2 bg-gray-50">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>
                    <p className="mb-6 text-sm text-center text-gray-500">Sign up to get started</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 transition border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
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

                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 transition border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {error && <div className="text-red-500">{error}</div>}
                        {success && <div className="text-green-500">{success}</div>}

                        <button
                            type="submit"
                            className="w-full p-3 font-bold text-white transition transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
