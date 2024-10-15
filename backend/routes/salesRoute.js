import express from 'express';
import { createSale, deleteSale, getSales, updateSale } from '../controllers/salesController.js';

const router = express.Router();

// Define routes for sales
router.get('/', getSales); // Get all sales
router.post('/', createSale); // Create a new sale
router.put('/:id', updateSale); // Update a sale by ID
router.delete('/:id', deleteSale); // Delete a sale by ID

export { router as salesRoute }