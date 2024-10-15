import express from 'express';
import { addSalesCategory, deleteSalesCategory, getSalesCategories, updateSalesCategory } from '../controllers/categoryControllers/salesCategoryController.js';

const router = express.Router();

// Route to add a new sales category
router.post('/', addSalesCategory);

// Route to get all sales categories (optional)
router.get('/', getSalesCategories);

// Update a sales category
router.put('/:id', updateSalesCategory);

// Delete a sales category
router.delete('/:id', deleteSalesCategory);

export { router as salesCategoryRoute }
