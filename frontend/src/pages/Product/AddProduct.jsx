import React, { useState } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, such as making an API call
    console.log({
      productName,
      price,
      category,
      description,
      stock,
      image,
    });
  };

  return (
    <div className="flex justify-center w-full p-8">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-600">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-600">Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-600">Category</label>
            <select
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home-appliance">Home Appliance</option>
              <option value="beauty">Beauty</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-600">Description</label>
            <textarea
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
            ></textarea>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-600">Stock Quantity</label>
            <input
              type="number"
              placeholder="Enter stock quantity"
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-600">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-green-100 file:text-green-700"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 font-bold text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
