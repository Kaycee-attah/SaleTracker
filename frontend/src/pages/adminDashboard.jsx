import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeeklyChart from '../Components/Charts/WeeklyChart';
import DailyChart from '../Components/Charts/DaysChart';
import MonthlyChart from '../Components/Charts/MonthsChart';
import YearlyChart from '../Components/Charts/YearsChart';

const AdminDashboard = () => {
  const [totals, setTotals] = useState({
    daily: { totalSales: 0, totalExpenses: 0 },
    weekly: { totalSales: 0, totalExpenses: 0 },
    monthly: { totalSales: 0, totalExpenses: 0 },
    yearly: { totalSales: 0, totalExpenses: 0 },
  });

  // Fetch totals for day, week, month, year
  const fetchTotals = async () => {
    try {
      const response = await fetch('/api/totals'); // Replace '/api/totals' with your API route
      if (!response.ok) {
        throw new Error('Failed to fetch totals');
      }
      const data = await response.json();
      setTotals(data);
    } catch (error) {
      console.error('Error fetching totals:', error);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-scroll bg-gray-100 scroll-hidden">
        {/* AdminDashboard Header */}
        <section className="mt-8 mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Add Expense Card */}
          <Link to="/admin-dashboard/add-expense" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl">
            <div className="flex items-center space-x-3">
              <i className="text-3xl text-green-500 fa-solid fa-plus"></i>
              <h3 className="text-xl font-semibold">Add Expenses</h3>
            </div>
          </Link>

          {/* Manage Expenses Card */}
          <Link to="/admin-dashboard/manage-expense" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl">
            <div className="flex items-center space-x-3">
              <i className="text-3xl text-orange-500 fa-solid fa-list-check"></i>
              <h3 className="text-xl font-semibold">Manage Expenses</h3>
            </div>
          </Link>

          {/* User Profile Card */}
          <Link to="/admin-dashboard/user" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl">
            <div className="flex items-center space-x-3">
              <i className="text-3xl text-blue-500 fa-solid fa-user"></i>
              <h3 className="text-xl font-semibold">User Profile</h3>
            </div>
          </Link>

          {/* Manage Users Card */}
          <Link to="/admin-dashboard/all-users" className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl">
            <div className="flex items-center space-x-3">
              <i className="text-3xl text-purple-500 fa-solid fa-users"></i>
              <h3 className="text-xl font-semibold">Manage Users</h3>
            </div>
          </Link>
        </section>

        {/* Full-Expense Report */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Sales and Expense Reports</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
            {/* Today's Chart */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">Today's Chart</h3>
              <p className="mb-4 text-sm">Total Sales: ₦ {totals.daily?.totalSales || 0} | Total Expenses: ₦ {totals.daily?.totalExpenses || 0}</p>
              <div className="h-fit">
                <DailyChart />
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">Weekly Chart</h3>
              <p className="mb-4 text-sm">Total Sales: ₦ {totals.weekly?.totalSales || 0} | Total Expenses: ₦ {totals.weekly?.totalExpenses || 0}</p>
              <div className="h-fit">
                <WeeklyChart />
              </div>
            </div>

            {/* Monthly Chart */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">Monthly Chart</h3>
              <p className="mb-4 text-sm">Total Sales: ₦ {totals.monthly?.totalSales || 0} | Total Expenses: ₦ {totals.monthly?.totalExpenses || 0}</p>
              <div className="h-fit">
                <MonthlyChart />
              </div>
            </div>

            {/* Yearly Chart */}
            <div className="w-full h-full p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">Yearly Chart</h3>
              <p className="mb-4 text-sm">Total Sales: ₦ {totals.yearly?.totalSales || 0} | Total Expenses: ₦ {totals.yearly?.totalExpenses || 0}</p>
              <div className="w-full h-fit">
                <YearlyChart />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
