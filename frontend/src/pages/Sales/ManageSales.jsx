import React, { useEffect, useState, useMemo } from 'react';
import { getSales, deleteSale, updateSale } from '../../Controllers/salesController'; // Adjust import paths as needed
import { fetchSalesCategories } from '../../Controllers/salesCategoryController';
import dayjs from 'dayjs';

const ManageSales = () => {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sales, setSales] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [editSaleId, setEditSaleId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editProductName, setEditProductName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const timeFrames = ['daily', 'weekly', 'monthly', 'yearly'];

  // Fetch sales whenever date or category changes
  useEffect(() => {
    const fetchSales = async () => {
      try {
        let formattedDate = selectedDate;

        // Adjust date format based on timeFrame
        if (timeFrame === 'weekly') {
          const week = dayjs(selectedDate).week();
          const year = dayjs(selectedDate).year();
          formattedDate = `${year}-W${week}`;
        } else if (timeFrame === 'monthly') {
          formattedDate = dayjs(selectedDate).format('YYYY-MM');
        } else if (timeFrame === 'yearly') {
          formattedDate = dayjs(selectedDate).year().toString();
        }

        // Fetch sales from backend with date and category filters
        const response = await getSales({
          date: formattedDate,
          category: selectedCategory !== 'All Categories' ? selectedCategory : null,
          timeFrame,
        });
        setSales(response);
      } catch (error) {
        setMessage('Failed to load sales');
      }
    };

    fetchSales();
  }, [selectedDate, selectedCategory, timeFrame]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchSalesCategories();
        setCategories(response);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchCategoriesData();
  }, []);

  const handleDeleteSale = async (id) => {
    try {
      await deleteSale(id);
      setSales(sales.filter((sale) => sale._id !== id));
      setMessage('Sale deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete sale');
    }
  };

  const handleEditSaleClick = (sale) => {
    setEditSaleId(sale._id);
    setEditName(sale.name);
    setEditProductName(sale.productName);
    setEditAmount(sale.amount);
    setEditCategory(sale.category);
  };

  const handleUpdateSale = async () => {
    try {
      const updatedSale = {
        name: editName,
        productName: editProductName,
        amount: Number(editAmount),
        category: editCategory,
      };
      await updateSale(editSaleId, updatedSale);
      setSales(sales.map((sale) => (sale._id === editSaleId ? { ...sale, ...updatedSale } : sale)));
      setEditSaleId(null);
      setMessage('Sale edited successfully!');
    } catch (error) {
      setMessage('Failed to edit sale');
    }
  };

  const totalSales = useMemo(() => {
    return sales.reduce((total, sale) => total + sale.amount, 0);
  }, [sales]);

  return (
    <div className="w-full h-screen p-6 bg-white rounded-lg shadow-md">
      <h1 className="mt-8 mb-6 text-2xl font-bold">Manage Sales</h1>

      {/* Filters */}
      <div className="flex flex-col mb-6 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* View By */}
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium">View By</label>
          <select
            className="w-full p-2 border rounded"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            {timeFrames.map((frame) => (
              <option key={frame} value={frame}>
                {frame.charAt(0).toUpperCase() + frame.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Select Date */}
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium">Select Date</label>
          <input
            type={
              timeFrame === 'weekly'
                ? 'week'
                : timeFrame === 'monthly'
                ? 'month'
                : timeFrame === 'yearly'
                ? 'number'
                : 'date'
            }
            className="w-full p-2 border rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Select Category */}
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium">Select Category</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Totals */}
      <div className="mb-4">
        <h2 className="mb-2 text-lg font-semibold">Category Totals</h2>
        <p>
          •{' '}
          {selectedCategory === 'All Categories' ? 'Total Sales' : selectedCategory}: ₦
          {totalSales.toFixed(2)}
        </p>
      </div>

      {/* Sales List */}
      <div className="overflow-y-auto h-4/6 no-scrollbar">
        <table className="min-w-full mb-4 border rounded table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale._id} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">
                    {editSaleId === sale._id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      sale.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editSaleId === sale._id ? (
                      <input
                        type="text"
                        value={editProductName}
                        onChange={(e) => setEditProductName(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      sale.productName
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editSaleId === sale._id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      `₦${sale.amount.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editSaleId === sale._id ? (
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      >
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      sale.category
                    )}
                  </td>
                  <td className="px-4 py-2">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    {editSaleId === sale._id ? (
                      <>
                        <button
                          className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                          onClick={handleUpdateSale}
                        >
                          Save
                        </button>
                        <button
                          className="px-2 py-1 text-white bg-red-500 rounded"
                          onClick={() => setEditSaleId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
                          onClick={() => handleEditSaleClick(sale)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 text-white bg-red-500 rounded"
                          onClick={() => handleDeleteSale(sale._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No sales found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Message */}
      {message && <div className="mt-4 text-green-500">{message}</div>}
    </div>
  );
};

export default ManageSales;
