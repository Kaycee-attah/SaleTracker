import React, { useEffect, useState, useMemo } from 'react';
import { getExpenses, addExpense, deleteExpense, updateExpense } from '../../Controllers/expensesController';
import { fetchCategories } from '../../Controllers/categoryController';
import dayjs from 'dayjs';

const ManageExpense = () => {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const timeFrames = ['daily', 'weekly', 'monthly', 'yearly'];

  // Fetch expenses whenever date or category changes
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        let formattedDate = selectedDate;
        if (timeFrame === 'weekly') {
          const week = dayjs(selectedDate).week();
          const year = dayjs(selectedDate).year();
          formattedDate = `${year}-W${week}`;
        } else if (timeFrame === 'monthly') {
          formattedDate = dayjs(selectedDate).format('YYYY-MM');
        } else if (timeFrame === 'yearly') {
          formattedDate = dayjs(selectedDate).year().toString();
        }

        const response = await getExpenses({ date: formattedDate, category: selectedCategory, timeFrame });
        setExpenses(response);
      } catch (error) {
        setMessage('Failed to load expenses');
      }
    };

    fetchExpenses();
  }, [selectedDate, selectedCategory, timeFrame]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        setMessage('Failed to load categories');
      }
    };

    fetchCategoriesData();
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(expense => expense.id !== id));
      setMessage('Expense deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete expense');
    }
  };

  const handleEditExpenseClick = (expense) => {
    setEditExpenseId(expense._id);
    setEditName(expense.name);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
  };

  const handleUpdateExpense = async () => {
    try {
      const updatedExpense = {
        name: editName,
        amount: Number(editAmount),
        category: editCategory,
      };
      await updateExpense(editExpenseId, updatedExpense);
      setExpenses(expenses.map(expense => (expense._id === editExpenseId ? { ...expense, ...updatedExpense } : expense)));
      setEditExpenseId(null);
      setMessage('Expense edited successfully!');
    } catch (error) {
      setMessage('Failed to edit expense');
    }
  };

  const totalExpense = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const categoryTotals = useMemo(() => {
    const totals = {};
    expenses.forEach(expense => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });
    return totals;
  }, [expenses]);

  return (
    <div className="w-full p-8 mx-auto bg-white rounded-lg shadow-md min-w-4xl">
      <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-800">Manage Expenses</h2>

      {/* Time Frame Dropdown */}
      <div className="flex mb-6 space-x-4">
        <div>
          <label htmlFor="timeFrame" className="block mb-1 text-sm font-medium text-gray-700">
            View By
          </label>
          <select
            id="timeFrame"
            name="timeFrame"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {timeFrames.map(frame => (
              <option key={frame} value={frame}>
                {frame.charAt(0).toUpperCase() + frame.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700">
            Select {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
          </label>
          <input
            type={timeFrame === 'weekly' ? 'week' : timeFrame === 'monthly' ? 'month' : timeFrame === 'yearly' ? 'number' : 'date'}
            id="date"
            name="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Category Dropdown */}
      <div className="mb-6">
        <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">
          Select Category
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedDate(dayjs().format('YYYY-MM-DD')); // Reset date when category changes
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Totals */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Category Totals</h3>
        <ul className="pl-5 list-disc">
          {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category} className="text-gray-700">
              {category}: # {total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {/* Expenses Table */}
      <div className="mb-6 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="text-gray-700 bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map(expense => (
                <tr key={expense.id} className="text-center border-t">
                  <td className="px-4 py-2">
                    {editExpenseId === expense._id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      />
                    ) : (
                      expense.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editExpenseId === expense._id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      />
                    ) : (
                      `₦ ${expense.amount}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editExpenseId === expense._id ? (
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                      >
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      expense.category
                    )}
                  </td>
                  <td className="px-4 py-2">{expense.date}</td>
                  <td className="px-4 py-2">
                    {editExpenseId === expense._id ? (
                      <button onClick={handleUpdateExpense} className="text-green-500 hover:text-green-700">
                        Done
                      </button>
                    ) : (
                      <button onClick={() => handleEditExpenseClick(expense)} className="mr-4 text-blue-500 hover:text-blue-700">
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDeleteExpense(expense._id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Expenses */}
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-xl font-bold">₦ {totalExpense.toFixed(2)}</p>
      </div>

      {/* Message */}
      {message && <div className="mt-4 text-red-500">{message}</div>}
    </div>
  );
};

export default ManageExpense;
