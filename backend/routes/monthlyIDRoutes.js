import express from 'express';
import { generateID } from "../controllers/monthlyIDController.js";

const router = express.Router();

// Route to generate the next ID
router.post('/generate-id', generateID);

export { router as monthlyIDRoutes }