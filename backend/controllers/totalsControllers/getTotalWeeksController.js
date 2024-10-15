import Expense from '../../models/ExpensesModel.js';
import Sale from '../../models/Sale.js';
import moment from 'moment';

// Helper function to get start of current week
const getDateRanges = () => {
  const weekStart = moment().startOf('week');
  return { weekStart };
};

export const getTotalWeeks = async (req, res) => {
  try {

    // Weekly sales aggregation
    const weeklySales = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" }
          },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 }
      }
    ]);

    // Weekly expenses aggregation
    const weeklyExpenses = await Expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" }
          },
          totalExpenses: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.week": 1 }
      }
    ]);

    // Prepare the response
    const weeklyData = weeklySales.map((sale, index) => {
      return {
        week: sale._id.week,
        year: sale._id.year,
        totalSales: sale.totalSales,
        totalExpenses: (weeklyExpenses[index]?.totalExpenses || 0) // Get corresponding expenses
      };
    });

    // Send response
    res.json(weeklyData); // Now sending an array of weekly data
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
