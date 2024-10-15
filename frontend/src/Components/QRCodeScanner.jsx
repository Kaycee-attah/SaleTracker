// QRCodeScanner.jsx
import React, { useState } from 'react';
import QrCodeReader from 'react-qrcode-reader';

const QRCodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const [batchName, batchNumber] = data.split('|'); // Assuming batchName and batchNumber are separated by '|'
      onScan(batchName, batchNumber);
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <div>
      <QrCodeReader
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default QRCodeScanner;
