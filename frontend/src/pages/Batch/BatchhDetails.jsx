import React, { useEffect, useState } from 'react'; 
import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { FiDollarSign, FiShoppingCart } from 'react-icons/fi'; // Import icons from react-icons

const BatchDetails = () => {
//   const location = useLocation();
  const navigate = useNavigate();

  // State for batch information
  const [ BatchName, setBatchName, ] = useState('');
  const [BatchNumber, setBatchNumber] = useState('');
  const [scanned, setScanned] = useState(false)
  

//   // Extract the batchName and batchNumber from location state
//   const { batchName, batchNumber } = location.state || {};

//   if (!BatchName || !BatchNumber) {
//     return <div className="text-center text-red-500">Batch details are missing!</div>;
//   }

  useEffect(() => {
    // Parse URL parameters for batch name and batch number
    const params = new URLSearchParams(window.location.search);
    const name = params.get('batchName');
    const number = params.get('batchNumber');
    if (name) setBatchName(name);
    if (number) setBatchNumber(number);
    if(name && number)  {
        setScanned(true)
    }
    console.log(BatchName, BatchNumber);
    
  }, [])

//   // Handle navigation and pass batch details to the respective page
//   const handleCardClick = (path) => {
//     navigate(path, { state: { batchName, batchNumber } });
//   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Display Batch Name and Number */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-white">Batch Details</h1>
        <p className="mt-4 text-xl text-gray-100">
          <span className="font-semibold">Batch Name:</span>   {BatchName}     </p>
        <p className="text-xl text-gray-100">
          <span className="font-semibold">Batch Number:</span>  {BatchNumber}
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Add Expenses Card */}
        <Link to="/admin-dashboard/add-expense" state={{BatchName, BatchNumber, scanned}}
          className="max-w-sm p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105"
          
        >
          <div className="flex items-center justify-center mb-4 text-green-500">
          <i class="fa-solid fa-dollar-sign"></i>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Add Expenses</h2>
            <p className="mt-4 text-gray-600">Keep track of your expenses with detailed logs.</p>
          </div>
        </Link>

        {/* Add Sales Card */}
        <Link to="/admin-dashboard/add-sales" state={{BatchName, BatchNumber, scanned}}
          className="max-w-sm p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105"
          
        >
          <div className="flex items-center justify-center mb-4 text-blue-500">
          <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Add Sales</h2>
            <p className="mt-4 text-gray-600">Easily record your sales to stay organized.</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default BatchDetails;
