import React, { useState } from 'react';
import { uploadImage } from '../Controllers/ImagesControllers/imgController';
import Sumud from '../Components/Sumud';

const Landing = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    const uploadedImage = await uploadImage(imageFile);
    if (uploadedImage) {
      setImageUrl(uploadedImage.imageUrl);
      alert('Image uploaded successfully!');
    } else {
      alert('Failed to upload image.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center px-6 py-24 text-center bg-center bg-cover"
        style={{ backgroundImage: "url('../../src/assets/images/Cassava_Flour_3.png')" }}
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
      </section>

      {/* Secondary Section */}
      <section className="py-16 bg-white">
        <div className="grid max-w-6xl grid-cols-1 gap-12 px-6 mx-auto md:grid-cols-2">
          {/* Left Column */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-800">From Our Fields to Your Table</h2>
            <p className="mb-6 text-gray-600">
              Bringing you the best in quality and freshness
            </p>
            <div className="flex space-x-4">
              <Sumud />
              <img src="/path/to/image2.jpg" alt="Product 2" className="object-cover w-24 h-24 rounded-md" />
            </div>
          </div>

          {/* Right Column */}
          <div className="relative p-6 bg-yellow-500 rounded-md shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Elevate Your Meals with Sumud's Premium Flour
            </h3>
            <p className="mb-6 text-gray-700">
              Rich in fiber and essential nutrients, Sumud cassava flour supports a balanced diet.
            </p>
            <p className="text-gray-700">
              Our cassava flour is a healthy substitute for wheat flour.
            </p>
            <img
              src="/path/to/product-image.jpg"
              alt="Cassava Flour"
              className="absolute bottom-0 right-0 object-cover w-24 h-24 rounded-md"
            />
            <button className="px-6 py-2 mt-6 font-bold text-white transition duration-300 bg-gray-800 rounded hover:bg-gray-700">
              ORDER NOW
            </button>
          </div>
        </div>
      </section>

      {/* Image Upload Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl px-6 mx-auto">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Upload Your Image</h2>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="mb-4" 
          />
          <button 
            onClick={handleUpload} 
            className="px-6 py-2 font-bold text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
          >
            Upload Image
          </button>
          {imageUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Uploaded Image URL:</h3>
              <p>{imageUrl}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      
    </div>
  );
};

export default Landing;
