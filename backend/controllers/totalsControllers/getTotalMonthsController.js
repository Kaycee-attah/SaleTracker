import Expense from '../../models/ExpensesModel.js'; 
import Sale from '../../models/Sale.js';
import moment from 'moment';

// Helper function to get the date range for the current year
const getDateRanges = () => {
  const startDate = moment().startOf('year'); // Start from the beginning of the year
  const endDate = moment().endOf('year'); // End of the year
  return { startDate, endDate };
};

export const getTotalMonths = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRanges();

    // Monthly sales aggregation for the current year
    const monthlySales = await Sale.aggregate([
      {
        $match: {
          date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filter for the current year
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" } // Group by month
          },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
      }
    ]);

    // Monthly expenses aggregation for the current year
    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filter for the current year
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" } // Group by month
          },
          totalExpenses: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
      }
    ]);

    // Prepare the response
    const monthlyData = monthlySales.map((sale, index) => {
      return {
        date: moment()
          .year(sale._id.year)
          .month(sale._id.month - 1) // Month is 0-indexed in moment.js
          .format('YYYY-MM-DD'), // Format date as YYYY-MM-DD
        totalSales: sale.totalSales,
        totalExpenses: (monthlyExpenses[index]?.totalExpenses || 0) // Get corresponding expenses
      };
    });

    // Send response
    res.json(monthlyData); // Now sending an array of monthly data
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
