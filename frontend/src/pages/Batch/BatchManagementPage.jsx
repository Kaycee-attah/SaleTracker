import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BatchManagement = () => {
  const BASE_URL = 'https://saletracker-backend.onrender.com/api';
  const location = useLocation();
  const navigate = useNavigate();

  // Extract batchName, batchNumber, and batchId from location state
  const { batchName, batchNumber, batchId } = location.state || {};
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('sales'); // Default filter set to 'sales'
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Modal state for editing batch
  const [editItem, setEditItem] = useState(null); // Currently editing item
  const [isEditingBatch, setIsEditingBatch] = useState(false); // Editing the batch itself
  const [editBatchData, setEditBatchData] = useState({ batchName, batchNumber, batchId }); // State for editing batch

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = '';

      if (filter === 'sales') {
        url = `/api/batches/${batchId}/sales`; // Use sales endpoint
      } else {
        url = `/api/batches/${batchId}/expenses`; // Use expenses endpoint
      }

      try {
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (batchId) {
      fetchData(); // Fetch data only when batchId is available
    }
  }, [batchId, filter]); // Re-fetch data when the filter changes

  if (!batchName || !batchNumber || !batchId) {
    return <div className="text-center text-red-500">Batch details are missing!</div>;
  }

  // Handle editing the batch
  const handleEditBatch = () => {
    setIsEditingBatch(true);
  };

  // Handle saving the edited batch
  const handleSaveBatchEdit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/batches/${batchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBatchData),
      });

      if (response.ok) {
        alert(`Batch ${editBatchData.batchName} updated successfully`);
        setIsEditingBatch(false);
      } else {
        alert('Failed to update the batch');
      }
    } catch (error) {
      console.error('Error updating batch:', error);
    }
  };

  // Handle deleting the batch
  const handleDeleteBatch = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete batch: ${batchName}?`);
    if (confirmed) {
      try {
        await fetch(`${BASE_URL}/batches/${batchId}`, { method: 'DELETE' });
        alert(`Batch ${batchName} deleted successfully`);
        navigate('/manage-batches'); // Redirect after deletion
      } catch (error) {
        console.error('Error deleting batch:', error);
      }
    }
  };

  // Handle editing rows (sales or expenses)
  const handleEditRow = (item) => {
    setIsEditing(true);
    setEditItem(item); // Open modal with item details
  };

  // Handle save after editing
  const handleSaveEdit = async () => {
    let url = filter === 'sales' ? `${BASE_URL}/sales/${editItem._id}` : `${BASE_URL}/expenses/${editItem._id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT', // Use PUT or PATCH for updating the item
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editItem),
      });

      if (response.ok) {
        alert(`${filter.slice(0, -1)} updated successfully`);
        setIsEditing(false);
        setEditItem(null); // Close modal after saving

        // Refresh the data
        setData((prevData) =>
          prevData.map((item) => (item._id === editItem._id ? editItem : item))
        );
      } else {
        alert('Failed to update the item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Handle deleting rows (sales or expenses)
  const handleDeleteRow = async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete this item?`);
    if (confirmed) {
      let url = filter === 'sales' ? `${BASE_URL}/sales/${id}` : `${BASE_URL}/expenses/${id}`;
      try {
        await fetch(url, { method: 'DELETE' });
        alert(`${filter.slice(0, -1)} deleted successfully`);
        setData((prevData) => prevData.filter((item) => item._id !== id)); // Remove deleted item from state
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-12 bg-gray-100">
      <div className="container mx-auto">
        {/* Batch Name and Number with Edit and Delete */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Manage {batchName}</h1>
          <p className="mt-2 text-lg text-gray-600">
            Batch Number: <span className="font-semibold">{batchNumber}</span>
          </p>
          <div className="mt-4">
            <button className="px-4 py-2 mr-4 text-white bg-blue-500 rounded-md" onClick={handleEditBatch}>Edit Batch</button>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md" onClick={handleDeleteBatch}>Delete Batch</button>
          </div>
        </div>

        {/* Edit Batch Modal */}
        {isEditingBatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 p-8 bg-white rounded-lg">
              <h2 className="text-2xl font-bold">Edit Batch</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveBatchEdit();
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">Batch Name</label>
                  <input
                    type="text"
                    value={editBatchData.batchName || ''}
                    onChange={(e) => setEditBatchData({ ...editBatchData, batchName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">Batch Number</label>
                  <input
                    type="text"
                    value={editBatchData.batchNumber || ''}
                    onChange={(e) => setEditBatchData({ ...editBatchData, batchNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md">Save</button>
                  <button
                    type="button"
                    className="px-4 py-2 text-white bg-gray-500 rounded-md"
                    onClick={() => setIsEditingBatch(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filter Dropdown */}
        <div className="mb-6 text-center">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="sales">Sales</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading && <div className="text-center">Loading...</div>}

        {/* Sales or Expenses Table */}
        <div className="p-8 bg-white rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                {filter === 'sales' ? (
                  <th className="px-4 py-2 text-left">Amount</th>
                ) : (
                  <th className="px-4 py-2 text-left">Cost</th>
                )}
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{filter === 'sales' ? item.amount : item.cost}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-2 py-1 mr-2 text-white bg-blue-500 rounded-md"
                      onClick={() => handleEditRow(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded-md"
                      onClick={() => handleDeleteRow(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Item Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 p-8 bg-white rounded-lg">
              <h2 className="text-2xl font-bold">Edit {filter.slice(0, -1)}</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveEdit();
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">Name</label>
                  <input
                    type="text"
                    value={editItem.name || ''}
                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">{filter === 'sales' ? 'Amount' : 'Cost'}</label>
                  <input
                    type="number"
                    value={filter === 'sales' ? editItem.amount : editItem.cost || ''}
                    onChange={(e) =>
                      setEditItem({ ...editItem, [filter === 'sales' ? 'amount' : 'cost']: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-gray-600">Quantity</label>
                  <input
                    type="number"
                    value={editItem.quantity || ''}
                    onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md">
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-white bg-gray-500 rounded-md"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchManagement;
