import Expense from '../../models/ExpensesModel.js'; 
import Sale from '../../models/Sale.js';
import moment from 'moment';

// Helper function to get date range for all available years
const getAllDateRanges = async () => {
  // Find the earliest and latest dates in the sales and expenses to determine the range
  const earliestSaleDate = await Sale.find().sort({ date: 1 }).limit(1).select('date');
  const earliestExpenseDate = await Expense.find().sort({ date: 1 }).limit(1).select('date');
  
  const earliestDate = moment.min(moment(earliestSaleDate[0]?.date), moment(earliestExpenseDate[0]?.date));
  const latestDate = moment(); // Assume we're interested in up to the current date

  return { startDate: earliestDate.startOf('year'), endDate: latestDate.endOf('year') };
};

export const getTotalYears = async (req, res) => {
  try {
    const { startDate, endDate } = await getAllDateRanges();

    // Monthly sales aggregation for all available years
    const monthlySales = await Sale.aggregate([
      {
        $match: {
          date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filter for all available years
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

    // Monthly expenses aggregation for all available years
    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filter for all available years
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
    const monthlyData = [];

    // Combine sales and expenses into a single structure
    monthlySales.forEach(sale => {
      const monthKey = `${sale._id.year}-${sale._id.month}`;
      const expenseEntry = monthlyExpenses.find(exp => 
        exp._id.year === sale._id.year && exp._id.month === sale._id.month
      );

      monthlyData.push({
        date: moment()
          .year(sale._id.year)
          .month(sale._id.month - 1) // Month is 0-indexed in moment.js
          .format('YYYY-MM-DD'), // Format date as YYYY-MM-DD
        totalSales: sale.totalSales,
        totalExpenses: expenseEntry ? expenseEntry.totalExpenses : 0 // Get corresponding expenses
      });
    });

    // Add entries for months without sales but with expenses
    monthlyExpenses.forEach(exp => {
      const monthKey = `${exp._id.year}-${exp._id.month}`;
      if (!monthlyData.some(data => data.date === moment().year(exp._id.year).month(exp._id.month - 1).format('YYYY-MM-DD'))) {
        monthlyData.push({
          date: moment()
            .year(exp._id.year)
            .month(exp._id.month - 1)
            .format('YYYY-MM-DD'),
          totalSales: 0, // No sales for this month
          totalExpenses: exp.totalExpenses
        });
      }
    });

    // Sort the monthly data by year and month
    monthlyData.sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);
      return dateA - dateB; // Ascending order
    });

    // Send response
    res.json(monthlyData); // Now sending an array of monthly data
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
