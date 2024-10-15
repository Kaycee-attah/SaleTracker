import Expense from '../../models/ExpensesModel.js'; 
import Sale from '../../models/Sale.js';
import moment from 'moment';

// Helper function to get the date range for the last 7 days
const getDateRanges = () => {
  const startDate = moment().subtract(6, 'days').startOf('day'); // Start from 6 days ago
  const endDate = moment().endOf('day'); // End of today
  return { startDate, endDate };
};

export const getTotalDays = async (req, res) => {
  try {
    const { startDate, endDate } = getDateRanges();

    // Daily sales aggregation for the last 7 days
    const dailySales = await Sale.aggregate([
      {
        $match: {
          date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filter for the last 7 days
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            day: { $dayOfYear: "$date" } // Group by day of the year
          },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.day": 1 } // Sort by year and day
      }
    ]);

    // Daily expenses aggregation for the last 7 days
    const dailyExpenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filter for the last 7 days
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            day: { $dayOfYear: "$date" } // Group by day of the year
          },
          totalExpenses: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.day": 1 } // Sort by year and day
      }
    ]);

    // Prepare the response
    const dailyData = dailySales.map((sale, index) => {
      return {
        date: moment()
          .year(sale._id.year)
          .dayOfYear(sale._id.day)
          .format('YYYY-MM-DD'), // Format date as YYYY-MM-DD
        totalSales: sale.totalSales,
        totalExpenses: (dailyExpenses[index]?.totalExpenses || 0) // Get corresponding expenses
      };
    });

    // Send response
    res.json(dailyData); // Now sending an array of daily data
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
