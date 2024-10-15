import Batch from '../models/BatchModel.js';
import Sale from '../models/Sale.js';

// Get all sales
export const getSales = async (req, res) => {
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
      const expenses = await Sale.find(query);
      console.log(query);
      
      res.json(expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new sale
export const createSale = async (req, res) => {
  const { productName, amount, quantity, date, category, name, batch } = req.body;
//   const { productName, name, amount, quantity, date, category, batch } = saleData;
  
    // Check if the batch already exists
    let batchRecord = await Batch.findOne({ batchName: batch.name, batchNumber: batch.number });
    

    
  
    // // If batch does not exist, create it
    // if (!batchRecord) {
    //   batchRecord = await Batch.create({
    //     name: batch.name,
    //     number: batch.number,
    //   });
    // }

    try {
        // Create the sale
    const newSale = await Sale.create({
        productName,
        name,
        amount,
        quantity,
        date,
        category,
        batch: batchRecord._id, // Use the batch ID for the sale
      });
      res.status(201).json(newSale);
      return newSale;
    } catch (error) {
        res.status(400).json({ message: 'Failed to create sale' });
    }
  
    
  
//     return newSale;

//   try {
//     const newSale = new Sale({ productName, amount, quantity, date, category, name });
//     await newSale.save();
//     res.status(201).json(newSale);
//   } catch (error) {
//     res.status(400).json({ message: 'Failed to create sale' });
//   }
};

// const addSale = async (saleData) => {
    
//   };

// Update a sale
export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { productName, amount, quantity, date, name } = req.body;

  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
      { productName, amount, quantity, date, name },
      { new: true }
    );

    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update sale' });
  }
};

// Delete a sale
export const deleteSale = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete sale' });
  }
};
