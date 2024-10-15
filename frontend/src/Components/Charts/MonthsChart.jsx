import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically import chart.js modules

const MonthlyChart = () => {
    const [monthlyData, setMonthlyData] = useState([]);
    const [chartType, setChartType] = useState('sales'); // State for chart type selection

    useEffect(() => {
        const fetchMonthlyData = async () => {
            try {
                const response = await fetch('/api/months/totals'); // Replace with your API route
                if (!response.ok) {
                    throw new Error('Failed to fetch monthly totals');
                }
                const data = await response.json();
                
                
                setMonthlyData(data); // Set the fetched monthly data
            } catch (error) {
                console.error('Error fetching monthly totals:', error);
            }
        };
        fetchMonthlyData();
    }, []);

    // Prepare labels and data for the chart
    const labels = monthlyData.map(item => item.date); // Months of the year
    const salesData = monthlyData.map(item => item.totalSales);
    const expensesData = monthlyData.map(item => item.totalExpenses);

    // Define the chart data based on the selected chart type
    const formattedData = {
        labels: labels, // Use all months
        datasets: [
            {
                label: chartType === 'sales' ? 'Monthly Sales' : 'Monthly Expenses',
                data: chartType === 'sales' ? salesData : expensesData, // Use sales or expenses data based on selection
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
            <h2 className="mb-4 text-lg font-semibold text-center text-gray-800">Monthly Sales and Expenses (This Year)</h2>
            
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

export default MonthlyChart;
