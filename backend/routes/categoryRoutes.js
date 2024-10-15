// routes/categoryRoutes.js
import express from 'express';
import { addCategory, deleteCategory, getCategories, updateCategory } from '../controllers/categoryControllers/categoryController.js';

const router = express.Router();

// Route to add a new category
router.post('/categories', addCategory);

// Route to get all categories
router.get('/categories', getCategories);

// Route to add a new category
router.put('/categories/:id', updateCategory);

// Route to get all categories
router.delete('/categories/:id', deleteCategory);


export { router as categoryRoutes }
