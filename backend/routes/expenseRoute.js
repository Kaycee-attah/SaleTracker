// routes/expenseRoutes.js
import express from 'express';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expensesController.js';

const router = express.Router();

// Define a POST route for adding expenses
router.post('/add', addExpense);

// Get all expenses
router.get('/', getExpenses);

// Update an expense by ID
router.put('/:id', updateExpense);

// Delete an expense by ID
router.delete('/:id', deleteExpense);

export { router as expensesRoute }
