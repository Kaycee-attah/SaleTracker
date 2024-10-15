import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically import chart.js modules

const DailyChart = () => {
    const [dailyData, setDailyData] = useState([]);
    const [chartType, setChartType] = useState('sales'); // State for chart type selection

    useEffect(() => {
        const fetchDailyData = async () => {
            try {
                const response = await fetch('/api/days/totals'); // Replace with your API route
                if (!response.ok) {
                    throw new Error('Failed to fetch daily totals');
                }
                const data = await response.json();
                
                
                setDailyData(data); // Set the fetched daily data
            } catch (error) {
                console.error('Error fetching daily totals:', error);
            }
        };
        fetchDailyData();
    }, []);

    // Prepare labels and data for the chart
    const labels = dailyData.map(item => item.date); // Dates for the last 7 days
    const salesData = dailyData.map(item => item.totalSales);
    const expensesData = dailyData.map(item => item.totalExpenses);

    // Define the chart data based on the selected chart type
    const formattedData = {
        labels: labels.slice(-7), // Take the last 7 days
        datasets: [
            {
                label: chartType === 'sales' ? 'Daily Sales' : 'Daily Expenses',
                data: chartType === 'sales' ? salesData.slice(-7) : expensesData.slice(-7), // Take the last 7 data points based on selected type
                borderColor: chartType === 'sales' ? '#4F46E5' : '#EF4444',
                backgroundColor: chartType === 'sales' 
                    ? 'rgba(79, 70, 229, 0.5)' 
                    : 'rgba(239, 68, 68, 0.5)', // Slightly transparent background
                tension: 0.3,
                pointBackgroundColor: chartType === 'sales' ? '#F59E0B' : '#10B981',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    // Define chart options
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#374151', // Dark gray text color for the legend
                    font: {
                        size: 14,
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#6B7280', // Gray color for x-axis labels
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: '#E5E7EB', // Light gray for grid lines
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    color: '#6B7280', // Gray color for y-axis labels
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: '#E5E7EB', // Light gray for grid lines
                },
            },
        },
    };

    return (
        <div className="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-center text-gray-800">Daily Sales and Expenses (Last 7 Days)</h2>
            
            {/* Dropdown to select chart type */}
            <div className="mb-4 text-center">
                <label htmlFor="chartType" className="mr-2 font-medium text-gray-700">Select Chart Type:</label>
                <select
                    id="chartType"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)} // Update chart type on selection
                    className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="sales">Sales</option>
                    <option value="expenses">Expenses</option>
                </select>
            </div>

            {/* Render the chart */}
            <Line data={formattedData} options={options} />
        </div>
    );
};

export default DailyChart;