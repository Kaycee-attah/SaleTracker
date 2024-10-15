import Batch from "../models/BatchModel.js";
import Expense from "../models/ExpensesModel.js";
import Sale from "../models/Sale.js";

// Add a new batch
export const addBatch = async (req, res) => {
  const { batchName, batchNumber, startDate, endDate } = req.body;

  try {
    const newBatch = new Batch({
      batchName,
      batchNumber,
      startDate,
      endDate,
    });
    await newBatch.save();
    res.status(201).json({ message: "Batch added successfully!", batch: newBatch });
  } catch (error) {
    res.status(400).json({ message: "Error adding batch", error });
  }
};

// Get all batches
export const getBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching batches", error });
  }
};

// Update a batch by its ID
export const updateBatch = async (req, res) => {
    // const { batchId } = req.params;
    const { batchName, batchNumber, batchId } = req.body;
    console.log(batchId, batchName, batchNumber);
    
  
    try {
      const updatedBatch = await Batch.findByIdAndUpdate(
        batchId,
        { batchName, batchNumber },
        { new: true, runValidators: true }
      );
  
      if (!updatedBatch) {
        return res.status(404).json({ message: "Batch not found" });
      }
  
      res.status(200).json({ message: "Batch updated successfully!", batch: updatedBatch });
    } catch (error) {
      res.status(400).json({ message: "Error updating batch", error });
    }
  };

  // Delete a batch by its ID
export const deleteBatch = async (req, res) => {
    const { batchId } = req.params;
  
    try {
      const deletedBatch = await Batch.findByIdAndDelete(batchId);
  
      if (!deletedBatch) {
        return res.status(404).json({ message: "Batch not found" });
      }
  
      res.status(200).json({ message: "Batch deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting batch", error });
    }
  };
  
  

export const getBatchIDFrmNum = async (req, res) => {
    try {
      // MongoDB query to find batch by number using Mongoose
      const batch = await Batch.findOne({ number: req.params.number });
      if (!batch) {
        return res.status(404).json({ message: 'Batch not found' });
      }
      res.json(batch);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

export const findBatchByID_Sales =  async (req, res) => {
    const { batchId } = req.params;
    try {
      const sales = await Sale.find({ batch: batchId });
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sales' });
    }
  }// Get sales for a specific batch
// app.get('/api/batches/:batchId/sales', );

export const findBatchByID_Expenses =  async (req, res) => {
    const { batchId } = req.params;
    try {
      const expenses = await Expense.find({ batch: batchId });
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  }
