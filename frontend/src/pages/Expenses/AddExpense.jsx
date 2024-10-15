// AddExpense.js
import React, { useEffect, useState } from 'react';
import { addExpense } from '../../Controllers/expensesController';
import { useLocation } from 'react-router-dom';
 // Importing the controller function

const AddExpense = () => {
    const location = useLocation();
    // Extract the batchName and batchNumber from location state
  const { BatchName, BatchNumber, scanned } = location.state || {};

  const [inputtedBatchName, setInputtedBatchName] = useState('');
  const [inputtedBatchNumber, setInputtedBatchNumber] = useState('');
  

  const [expenseData, setExpenseData] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  
  // State for batch information
  const [batchName, setBatchName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // // Parse URL parameters for batch name and batch number
    // const params = new URLSearchParams(window.location.search);
    // const name = params.get('batchName');
    // const number = params.get('batchNumber');
    if (BatchName) setBatchName(BatchName);
    if (BatchNumber) setBatchNumber(BatchNumber);
  }, [])

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the controller with individual parameters
      const response = await addExpense({
        name: expenseData.name,
        amount: expenseData.amount,
        date: expenseData.date,
        category: expenseData.category,
        description: expenseData.description,
        batch: {
            name: batchName  || inputtedBatchName,
            number: batchNumber || inputtedBatchNumber
        },
      });
      setMessage(response.message);  // Success message from the backend
      setExpenseData({ name: '', amount: '', date: '', category: '', description: '' });  // Clear form
    } catch (error) {
      setMessage('Error adding expense: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Add Expense</h2>
        {message && <div className="mb-4 text-center text-red-500">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block mb-1 text-sm font-semibold" htmlFor="name">
              Expense Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={expenseData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block mb-1 text-sm font-semibold" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block mb-1 text-sm font-semibold" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label className="block mb-1 text-sm font-semibold" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-1 text-sm font-semibold" htmlFor="description">
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
