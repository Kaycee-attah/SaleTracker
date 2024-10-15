import Batch from "../models/BatchModel.js";
import Expense from "../models/ExpensesModel.js";
// controllers/expenseController.js

export const getExpenses = async (req, res) => {
    const { date, category, timeFrame } = req.query; // Extract query parameters
  
    try {
      const query = {};
      console.log(category);
      
  
      // Filter by category if provided
      if (category) {
        query.category = category;
      }
  
      // Handle different time frame formats
      if (timeFrame === 'daily') {
        // Match by exact date without time component
        const incomingDate = new Date(date);
        const startOfDay = new Date(incomingDate.setHours(0, 0, 0, 0)).toISOString(); // Start of the day
        const endOfDay = new Date(incomingDate.setHours(23, 59, 59, 999)).toISOString(); // End of the day
  
        query.date = {
          $gte: startOfDay.replace("Z", "+00:00"), // Convert to desired format
          $lte: endOfDay.replace("Z", "+00:00") // Convert to desired format
        };
      } else if (timeFrame === 'weekly') {
        // For 'weekly', find the start and end of the week
        const [year, week] = date.split('-W');
        const startOfWeek = getDateOfISOWeek(week, year).toISOString(); // Start of the week in ISO format
        const endOfWeek = new Date(new Date(startOfWeek).setDate(new Date(startOfWeek).getDate() + 6)).toISOString(); // 7 days later
  
        query.date = {
          $gte: startOfWeek.replace("Z", "+00:00"), // Convert to desired format
          $lte: endOfWeek.replace("Z", "+00:00") // Convert to desired format
        };
      } else if (timeFrame === 'monthly') {
        // For 'monthly', match the exact month
        const [year, month] = date.split('-');
        const startOfMonth = new Date(`${year}-${month}-01T00:00:00.000Z`).toISOString(); // First day of the month
        const endOfMonth = new Date(new Date(startOfMonth).setMonth(new Date(startOfMonth).getMonth() + 1, 0)).toISOString(); // Last day of the month
  
        query.date = {
          $gte: startOfMonth.replace("Z", "+00:00"), // Convert to desired format
          $lte: endOfMonth.replace("Z", "+00:00") // Convert to desired format
        };
      } else if (timeFrame === 'yearly') {
        // For 'yearly', match the entire year
        const startOfYear = new Date(`${date}-01-01T00:00:00.000Z`).toISOString(); // First day of the year
        const endOfYear = new Date(new Date(startOfYear).setFullYear(new Date(startOfYear).getFullYear() + 1, 0, 0)).toISOString(); // Last day of the year
  
        query.date = {
          $gte: startOfYear.replace("Z", "+00:00"), // Convert to desired format
          $lte: endOfYear.replace("Z", "+00:00") // Convert to desired format
        };
      }
  
      // Fetch expenses with the built query
      const expenses = await Expense.find(query);
      console.log(query);
      
      res.json(expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


// Helper function to get the start date of an ISO week
function getDateOfISOWeek(week, year) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    return ISOweekStart;
}


// Controller to handle adding a new expense
export const addExpense = async (req, res) => {
  try {
    const { name, amount, date, category, description, batch } = req.body;
    

  
    // Check if the batch already exists
    let batchRecord = await Batch.findOne({ batchName: batch.name, batchNumber: batch.number });

    // Create a new expense
    const expense = new Expense({
      name,
      amount,
      date,
      category,
      description,
      batch: batchRecord._id
    });

    // Save the expense to the database
    await expense.save();

    // Send a response back
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense', error });
  }
};

// Update an expense by ID
export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { name, amount, category } = req.body;
  
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { name, amount, category },
        { new: true } // Return the updated document
      );
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json(updatedExpense); // Return the updated expense
    } catch (error) {
      res.status(500).json({ message: 'Failed to update expense', error });
    }
  };
  
  // Delete an expense by ID
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense deleted successfully' }); // Return success message
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete expense', error });
    }
  };
