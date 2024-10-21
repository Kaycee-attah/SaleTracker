import React, { useEffect, useState } from 'react';
import {
  saveLandingPageImageUrlToDB,
  uploadLandingPageImage,
} from '../../Controllers/ImagesControllers/landingPageImagesController';

const LandingUpload = () => {
  const BASE_URL = 'https://saletracker-backend.onrender.com/api';
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState({
    hero: '',
    product1: '',
    product2: '',
    cassavaFlour: '',
  });
  const [uploading, setUploading] = useState({
    hero: false,
    product1: false,
    product2: false,
    cassavaFlour: false,
  });
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const fetchImages = async () => {
    try {
      const sections = [
        { section: 'landing', name: 'hero' },
        { section: 'products', name: 'product1' },
        { section: 'products', name: 'product2' },
        { section: 'cassava', name: 'cassavaFlour' },
      ];

      const fetchedImages = await Promise.all(
        sections.map(async ({ section, name }) => {
          const response = await fetch(`${BASE_URL}/fetch-image/${section}/${name}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch image for ${section} - ${name}`);
          }
          const data = await response.json();
          return { name, url: data.imageUrl };
        })
      );

      const newImageUrl = fetchedImages.reduce((acc, { name, url }) => {
        acc[name] = url;
        return acc;
      }, {});

      setImageUrl(newImageUrl);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images when the component loads
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = async (sectionName, fileName) => {
    console.log(sectionName, fileName);
    
    if (!imageFile) {
      setUploadError('Please select an image file to upload.');
      return;
    }

    setUploading((prev) => ({ ...prev, [fileName]: true }));
    setUploadError('');
    setUploadSuccess('');

    try {
      const uploadedImage = await uploadLandingPageImage(imageFile);
      if (uploadedImage) {
        console.log(uploadedImage);
        
        const imageUrl = uploadedImage.imageUrl;

        // Save the image URL to the database
        await saveLandingPageImageUrlToDB(imageUrl, sectionName, fileName);

        // Update the local state with the new image URL
        setImageUrl((prev) => ({ ...prev, [fileName]: imageUrl }));

        setUploadSuccess('Image uploaded and saved successfully!');
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (error) {
      setUploadError(error.message || 'Failed to upload image.');
    } finally {
      setUploading((prev) => ({ ...prev, [fileName]: false }));
    }
  };

  return (
    <div className="w-full min-h-screen overflow-y-scroll bg-white">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-center bg-cover"
        style={{
          backgroundImage: `url(${imageUrl.hero || '../../src/assets/images/Cassava_Flour_3.png'})`,
        }}
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
        <div className="absolute flex space-x-2 bottom-4 right-4">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="hero-upload" />
          <label
            htmlFor="hero-upload"
            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            Edit Hero
          </label>
          <button
            onClick={() => handleUpload('landing', 'hero')}
            className="px-2 py-1 text-xs text-white bg-green-500 rounded-lg hover:bg-green-600"
            disabled={uploading.hero}
          >
            {uploading.hero ? 'Uploading...' : 'Upload'}
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
            <div className="flex space-x-4">
              <div className="relative">
                <img
                  src={imageUrl.product1 || '/path/to/image1.jpg'}
                  alt="Product 1"
                  className="object-cover w-24 h-24 rounded-md"
                />
                <div className="absolute bottom-0 right-0 flex space-x-2">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="product1-upload" />
                  <label
                    htmlFor="product1-upload"
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
                  >
                    Edit
                  </label>
                  <button
                    onClick={() => handleUpload('products', 'product1')}
                    className="px-2 py-1 text-xs text-white bg-green-500 rounded-lg hover:bg-green-600"
                    disabled={uploading.product1}
                  >
                    {uploading.product1 ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>

              <div className="relative">
                <img
                  src={imageUrl.product2 || '/path/to/image2.jpg'}
                  alt="Product 2"
                  className="object-cover w-24 h-24 rounded-md"
                />
                <div className="absolute bottom-0 right-0 flex space-x-2">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="product2-upload" />
                  <label
                    htmlFor="product2-upload"
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
                  >
                    Edit
                  </label>
                  <button
                    onClick={() => handleUpload('products', 'product2')}
                    className="px-2 py-1 text-xs text-white bg-green-500 rounded-lg hover:bg-green-600"
                    disabled={uploading.product2}
                  >
                    {uploading.product2 ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
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
            <p className="text-gray-700">Our cassava flour is a healthy substitute for wheat flour.</p>
            <img
              src={imageUrl.cassavaFlour || '/path/to/product-image.jpg'}
              alt="Cassava Flour"
              className="absolute bottom-0 right-0 object-cover w-24 h-24 rounded-md"
            />
            <div className="absolute flex space-x-2 bottom-4 right-4">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="cassavaFlour-upload" />
              <label
                htmlFor="cassavaFlour-upload"
                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
              >
                Edit
              </label>
              <button
                onClick={() => handleUpload('cassava', 'cassavaFlour')}
                className="px-2 py-1 text-xs text-white bg-green-500 rounded-lg hover:bg-green-600"
                disabled={uploading.cassavaFlour}
              >
                {uploading.cassavaFlour ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Error and Success Notifications */}
      {uploadError && <p className="text-center text-red-500">{uploadError}</p>}
      {uploadSuccess && <p className="text-center text-green-500">{uploadSuccess}</p>}
    </div>
  );
};

export default LandingUpload;
