import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://saletracker-backend.onrender.com/api';
// Fetch batches from your backend
const fetchBatches = async () => {
  try {
    const response = await fetch(`${BASE_URL}/batches`); // Replace with your actual API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching batches:', error);
    return [];
  }
};

// Fetch sales for a batch
const fetchSales = async (batchId) => {
  try {
    const response = await fetch(`${BASE_URL}/batches/${batchId}/sales`); // Replace with your actual API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    return [];
  }
};

// Fetch expenses for a batch
const fetchExpenses = async (batchId) => {
  try {
    const response = await fetch(`${BASE_URL}/batches/${batchId}/expenses`); // Replace with your actual API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBatches = async () => {
      const batchData = await fetchBatches();
      

      // Fetch sales and expenses for each batch and calculate totals
      const detailedBatches = await Promise.all(
        batchData.map(async (batch) => {
          const sales = await fetchSales(batch._id);
          const expenses = await fetchExpenses(batch._id);

          // Sum the sales and expenses amounts
          const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
          const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
          const profit = totalSales - totalExpenses; // Calculate profit

          return {
            ...batch,
            totalSales,
            totalExpenses,
            profit // Add profit to the batch object
          };
        })
      );

      setBatches(detailedBatches);
    };

    getBatches();
  }, []);

  // Navigate to batch details or other relevant page
  const handleBatchClick = (batch) => {
    navigate(`/admin-dashboard/manage-batches/${batch._id}`, {
      state: {
        batchName: batch.batchName,
        batchNumber: batch.batchNumber,
        batchId: batch._id
      }
    });
  };

  return (
    <div className="w-full min-h-screen py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h1 className="mb-12 text-5xl font-extrabold text-center text-gray-800">Manage Batches</h1>

        {/* Grid of Batches */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {batches.length > 0 ? (
            batches.map((batch) => (
              <div
                key={batch._id}
                className="relative p-6 transition-transform transform bg-white rounded-lg shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl"
                onClick={() => handleBatchClick(batch)}
              >
                {/* Profit indicator */}
                <div className={`absolute top-4 right-4 flex items-center text-sm ${batch.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {batch.profit >= 0 ? (
                    <>
                      <span className="mr-1">Profit: ₦ {batch.profit.toFixed(2)}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3l-5 5h3v4h4V8h3l-5-5z" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span className="mr-1">Loss: ₦ {Math.abs(batch.profit).toFixed(2)}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 17l5-5h-3V8H8v4H5l5 5z" />
                      </svg>
                    </>
                  )}
                </div>
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">{batch.batchName}</h2>
                <p className="mb-2 text-lg text-gray-600">Batch Number: <span className="font-medium">{batch.batchNumber}</span></p>
                <p className="mb-2 text-lg text-green-600">Total Sales: <span className="font-semibold">₦ {batch.totalSales.toFixed(2)}</span></p>
                <p className="text-lg text-red-600">Total Expenses: <span className="font-semibold">₦ {batch.totalExpenses.toFixed(2)}</span></p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No batches available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBatches;
