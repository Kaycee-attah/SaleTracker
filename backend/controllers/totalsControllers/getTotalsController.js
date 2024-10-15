import Expense from '../../models/ExpensesModel.js';
import Sale from '../../models/Sale.js';
import moment from 'moment';

// Helper function to get start and end of current day, week, month, year
const getDateRanges = () => {
  const today = moment().startOf('day');
  const weekStart = moment().startOf('week');
  const monthStart = moment().startOf('month');
  const yearStart = moment().startOf('year');
  return { today, weekStart, monthStart, yearStart };
};

export const getTotals = async (req, res) => {
  try {
    const { today, weekStart, monthStart, yearStart } = getDateRanges();
    
    
    

    // Today's totals
    const todaySales = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" }
          },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);
    const todayExpenses = await Expense.aggregate([
      { $match: { date: { $gte: today.toDate() } } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
    ]);

    // Weekly totals
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
    
    const weeklyExpenses = await Expense.aggregate([
      { $match: { date: { $gte: weekStart.toDate() } } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
    ]);

    // Monthly totals
    const monthlySales = await Sale.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    const monthlyExpenses = await Expense.aggregate([
      { $match: { date: { $gte: monthStart.toDate() } } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
    ]);

    // Yearly totals
    const yearlySales = await Sale.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" } },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1 }
      }
    ]);
    
    const yearlyExpenses = await Expense.aggregate([
      { $match: { date: { $gte: yearStart.toDate() } } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } },
    ]);

    
    

    // Send response
    res.json({
      today: {
        totalSales: todaySales[0]?.totalSales || 0,
        totalExpenses: todayExpenses[0]?.totalExpenses || 0,
      },
      weekly: {
        totalSales: weeklySales[0]?.totalSales || 0,
        totalExpenses: weeklyExpenses[0]?.totalExpenses || 0,
      },
      monthly: {
        totalSales: monthlySales[0]?.totalSales || 0,
        totalExpenses: monthlyExpenses[0]?.totalExpenses || 0,
      },
      yearly: {
        totalSales: yearlySales[0]?.totalSales || 0,
        totalExpenses: yearlyExpenses[0]?.totalExpenses || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


