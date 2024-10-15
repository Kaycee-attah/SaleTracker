import React, { useState, useEffect } from 'react';
import { addSale } from '../../Controllers/salesController'; // Import the addSale function
import { fetchSalesCategories } from '../../Controllers/salesCategoryController'; // Import the fetchCategories function
import QrReader from 'react-qrcode-reader'; // Import the QR code reader
import { useLocation } from 'react-router-dom';

const AddSales = () => {
  const [productName, setProductName] = useState('');
  const [name, setName] = useState(''); // New state for the name
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(''); // State for selected category
  const [categories, setCategories] = useState([]); // State for categories
  const [message, setMessage] = useState('');

//   // State for batch information
  const [batchName, setBatchName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');

  const [inputtedBatchName, setInputtedBatchName] = useState('');
  const [inputtedBatchNumber, setInputtedBatchNumber] = useState('');


  const location = useLocation();
    // Extract the batchName and batchNumber from location state
  const { BatchName, BatchNumber, scanned } = location.state || {};

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchSalesCategories(); // Fetch categories from the backend
        setCategories(categoriesData); // Set the fetched categories
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    getCategories(); // Call the function to fetch categories

    // // Parse URL parameters for batch name and batch number
    // const params = new URLSearchParams(window.location.search);
    // const name = params.get('batchName');
    // const number = params.get('batchNumber');
    if (BatchName) setBatchName(BatchName);
    if (BatchNumber) setBatchNumber(BatchNumber);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch batch ObjectId by batch number (assuming batchNumber is unique)
      const response = await fetch(`/api/batches/findByNumber/${batchNumber}`);
      const batch = await response.json();
  
      if (!batch) {
        setMessage('Batch not found');
        return;
      }
  
      const saleData = {
        productName,
        name,
        amount: parseFloat(amount),
        quantity: parseInt(quantity),
        date: new Date(date).toISOString(),
        category,
        batch: {
            name: batchName  || inputtedBatchName,
            number: batchNumber || inputtedBatchNumber
        }, // Use the ObjectId of the batch
      };
  
      const newSale = await addSale(saleData); // Call your controller to add the sale
      setMessage(`Sale added successfully: ${newSale.productName}`);
      // Reset form
    } catch (error) {
      setMessage(error.message);
    }
  };
  

 

  

  return (
    <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-md min-w-md">
      <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-800">Add Sale</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productName" className="block mb-1 text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block mb-1 text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-1 text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Batch Name Field */}
        {
            scanned ? 
            
            (<div className="mb-4">
              <label htmlFor="batchName" className="block mb-1 text-sm font-medium text-gray-700">
                Batch Name
              </label>
              <input
                type="text"
                id="batchName"
                readOnly
                value={batchName}
                onChange={(e) => setInputtedBatchName(e.target.value)}
                 // Make this field read-only since it's filled by the QR code
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>) : (
            <div className="mb-4">
            <label htmlFor="batchName" className="block mb-1 text-sm font-medium text-gray-700">
                Batch Name
            </label>
            <input
                type="text"
                id="batchName"
                value={inputtedBatchName}
                onChange={(e) => setInputtedBatchName(e.target.value)}
                // Make this field read-only since it's filled by the QR code
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
            />
            </div>)
        }

        {/* Batch Number Field */}
        {
            scanned ? (
                <div className="mb-4">
                <label htmlFor="batchNumber" className="block mb-1 text-sm font-medium text-gray-700">
                    Batch Number
                </label>
                <input
                    type="text"
                    id="batchNumber"
                    readOnly
                    value={batchNumber}
                    onChange={(e) => setInputtedBatchNumber(e.target.value)}
                    // Make this field read-only since it's filled by the QR code
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                />
                </div>
            ) : (
                <div className="mb-4">
                    <label htmlFor="batchNumber" className="block mb-1 text-sm font-medium text-gray-700">
                        Batch Number
                    </label>
                    <input
                        type="text"
                        id="batchNumber"
                        value={inputtedBatchNumber}
                        onChange={(e) => setInputtedBatchNumber(e.target.value)}
                        // Make this field read-only since it's filled by the QR code
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                    />
                </div>
            )
        }
        

    

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Sale
        </button>
      </form>

      {/* Display message */}
      {message && <div className="mt-4 text-red-500">{message}</div>}
    </div>
  );
};

export default AddSales;
