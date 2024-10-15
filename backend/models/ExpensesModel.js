// models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'batches', // Reference to the Batch model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

const Expense = mongoose.model('Expenses', expenseSchema);

export default Expense;
