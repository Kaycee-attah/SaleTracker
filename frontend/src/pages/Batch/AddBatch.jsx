import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { generateID } from '../../Controllers/monthlyIDController';
import { createBatch } from '../../Controllers/batchController'

const AddBatch = () => {
  const [batchName, setBatchName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [message, setMessage] = useState('');
//   const [generatedID, setGeneratedID] = useState('');
  const qrCodeRef = useRef(null); // Reference to the QR code canvas

  // Function to generate unique batch number
  const generateUniqueBatchNumber = async () => {

    try {
        const newID = await generateID();
        setBatchNumber(newID);
      } catch (error) {
        console.error('Failed to generate ID');
      }
  };

  // Function to generate QR code for the batch name, number, and Add Sales URL
  // Function to generate QR code for the batch name, number, and Add Sales URL
const generateQRCode = () => {
    if (batchName && batchNumber) {
      // Update the URL with batchName and batchNumber
      const qrValue = `https://saletracker-frontend.onrender.com/admin-dashboard/batch-details?batchName=${encodeURIComponent(batchName)}&batchNumber=${encodeURIComponent(batchNumber)}`;
      setQrCode(qrValue);
    } else {
      setMessage('Please generate or input a batch name and number first.');
    }
  };
  

  // Function to download QR code as an image
  const downloadQRCode = () => {
    const canvas = qrCodeRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
    link.download = `${batchName}-${batchNumber}.png`; // Set download file name
    link.click(); // Trigger the download
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batchName || !batchNumber || !startDate || !endDate) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Prepare batch data
    const batchData = {
      batchName,
      batchNumber,
      startDate,
      endDate,
    };

    try {
      // Call the createBatch function from the controller
      const result = await createBatch(batchData);
      setMessage(result.message); // Display success message
      // Reset fields
      setBatchName('');
      setBatchNumber('');
      setStartDate('');
      setEndDate('');
      setQrCode(''); // Reset QR code after submission
    } catch (error) {
      setMessage(error.message); // Display error message
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="mt-8 mb-6 text-2xl font-bold">Add Batch</h1>
      <form onSubmit={handleSubmit}>
        {/* Batch Name */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Batch Name</label>
          <input
            type="text"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter batch name"
            required
          />
        </div>

        {/* Batch Number */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Batch Number</label>
          <div className="flex">
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="w-full p-2 mr-2 border rounded"
              placeholder="Enter or generate batch number"
              required
            />
            <button
              type="button"
              onClick={generateUniqueBatchNumber}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* QR Code Generator */}
        <div className="mb-6">
          <button
            type="button"
            onClick={generateQRCode}
            className="w-full px-4 py-2 mb-4 font-bold text-white bg-green-500 rounded hover:bg-green-700"
          >
            Generate QR Code
          </button>
          {qrCode && (
            <div className="flex justify-center">
              <QRCodeCanvas ref={qrCodeRef} value={qrCode} size={150} />
            </div>
          )}
          {qrCode && (
            <button
              type="button"
              onClick={downloadQRCode}
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700"
            >
              Download QR Code
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Add Batch
        </button>
      </form>

      {/* Message Display */}
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AddBatch;
