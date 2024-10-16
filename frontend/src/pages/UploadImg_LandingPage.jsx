import React, { useState } from 'react';
import { uploadImageToFirebase, saveImageToMongoDB } from '../Controllers/imageController';

const UploadImg_LandingPage = ({ folder }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrls, setImageUrls] = useState({
    hero: 'https://via.placeholder.com/600x400?text=Hero+Image', // Placeholder for hero image
    product1: 'https://via.placeholder.com/100x100?text=Product+1', // Placeholder for product 1
    product2: 'https://via.placeholder.com/100x100?text=Product+2', // Placeholder for product 2
    productRight: 'https://via.placeholder.com/100x100?text=Product+Right', // Placeholder for right product
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (imageType) => {
    if (selectedFile) {
      const imageUrl = await uploadImageToFirebase(selectedFile, folder);
      if (imageUrl) {
        // Save the new image URL to MongoDB
        saveImageToMongoDB({ folder, imageType, imageUrl });

        // Dynamically update the image in the UI
        setImageUrls((prevUrls) => ({
          ...prevUrls,
          [imageType]: imageUrl,
        }));
        alert('Image uploaded successfully!');
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {folder === 'homepage' && (
        <>
          {/* Hero Section */}
          <section
            className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-center bg-cover"
            style={{ backgroundImage: `url(${imageUrls.hero})` }}
          >
            <h1 className="mb-4 text-4xl font-extrabold text-gray-800 md:text-5xl">
              Discover the Taste of Tradition with Sumud
            </h1>
            <p className="mb-6 text-lg text-gray-700 md:text-xl">
              Experience the rich flavors of authentic cassava and garri flour
            </p>
            <button className="px-8 py-3 font-bold text-white transition duration-300 bg-gray-800 rounded hover:bg-gray-700">
              EXPLORE
            </button>

            {/* Edit Image Button */}
            <div className="absolute flex flex-col items-center top-4 right-4">
              <label className="relative block">
                <input type="file" onChange={handleFileChange} className="hidden" />
                <span className="absolute inset-0 flex items-center justify-center px-4 py-2 text-xs font-bold text-white transition-opacity duration-300 bg-green-600 rounded cursor-pointer opacity-90 hover:opacity-100">
                  Edit
                </span>
              </label>
              <button
                onClick={() => handleUpload('hero')}
                className="block px-6 py-3 mt-2 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded opacity-90 hover:opacity-100"
              >
                Upload
              </button>
            </div>
          </section>

          {/* Secondary Section */}
          <section className="py-16 bg-white">
            <div className="grid max-w-6xl grid-cols-1 gap-12 px-6 mx-auto md:grid-cols-2">
              {/* Left Column */}
              <div>
                <h2 className="mb-4 text-3xl font-bold text-gray-800">From Our Fields to Your Table</h2>
                <p className="mb-6 text-gray-600">Bringing you the best in quality and freshness</p>
                <div className="relative flex space-x-4">
                  <div className="relative">
                    <img
                      src={imageUrls.product1}
                      alt="Product 1"
                      className="object-cover w-24 h-24 rounded-md"
                    />
                    {/* Edit and Upload Buttons for Product 1 */}
                    <div className="absolute bottom-0 right-0 flex flex-col items-center mb-2">
                      <label className="relative block">
                        <input type="file" onChange={handleFileChange} className="hidden" />
                        <span className="absolute inset-0 flex items-center justify-center px-4 py-2 text-xs font-bold text-white transition-opacity duration-300 bg-green-600 rounded cursor-pointer opacity-90 hover:opacity-100">
                          Edit
                        </span>
                      </label>
                      <button
                        onClick={() => handleUpload('product1')}
                        className="block px-6 py-2 mt-1 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded opacity-90 hover:opacity-100"
                      >
                        Upload
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src={imageUrls.product2}
                      alt="Product 2"
                      className="object-cover w-24 h-24 rounded-md"
                    />
                    {/* Edit and Upload Buttons for Product 2 */}
                    <div className="absolute bottom-0 right-0 flex flex-col items-center mb-2">
                      <label className="relative block">
                        <input type="file" onChange={handleFileChange} className="hidden" />
                        <span className="absolute inset-0 flex items-center justify-center px-4 py-2 text-xs font-bold text-white transition-opacity duration-300 bg-green-600 rounded cursor-pointer opacity-90 hover:opacity-100">
                          Edit
                        </span>
                      </label>
                      <button
                        onClick={() => handleUpload('product2')}
                        className="block px-6 py-2 mt-1 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded opacity-90 hover:opacity-100"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="relative p-6 bg-yellow-500 rounded-md shadow-lg">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Elevate Your Meals with Sumud's Premium Flour</h3>
                <p className="mb-6 text-gray-700">
                  Rich in fiber and essential nutrients, Sumud cassava flour supports a balanced diet.
                </p>
                <img
                  src={imageUrls.productRight}
                  alt="Cassava Flour"
                  className="absolute bottom-0 right-0 object-cover w-24 h-24 rounded-md"
                />

                {/* Edit and Upload Buttons for Product Right */}
                <div className="absolute bottom-0 right-0 flex flex-col items-center mb-2">
                  <label className="relative block">
                    <input type="file" onChange={handleFileChange} className="hidden" />
                    <span className="absolute inset-0 flex items-center justify-center px-4 py-2 text-xs font-bold text-white transition-opacity duration-300 bg-green-600 rounded cursor-pointer opacity-90 hover:opacity-100">
                      Edit
                    </span>
                  </label>
                  <button
                    onClick={() => handleUpload('productRight')}
                    className="block px-6 py-2 mt-1 text-sm font-semibold text-white transition duration-300 bg-blue-600 rounded opacity-90 hover:opacity-100"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      {folder === 'Login' && (
  <>
    {/* Login Section */}
    <section
      className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-center bg-cover"
      style={{ backgroundImage: `url(${imageUrls.loginBackground})` }}
    >
      <h1 className="mb-4 text-4xl font-extrabold text-gray-800 md:text-5xl">
        Welcome to SUMUD
      </h1>
      <p className="mb-6 text-lg text-gray-700 md:text-xl">
        Please enter your credentials to continue
      </p>

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
        </section>
    </>
    )}

    </div>
  );
};

export default UploadImg_LandingPage;
