import express from "express";
import { addBatch, deleteBatch, findBatchByID_Expenses, findBatchByID_Sales, getBatches, getBatchIDFrmNum, updateBatch } from "../controllers/batchController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Route to add a batch
router.post("/", verifyToken, addBatch);

// Route to get all batches
router.get("/", getBatches);

// Route to update a batch
router.put("/:id", verifyToken, updateBatch);

// Route to delete a batch
router.delete("/:id", verifyToken, deleteBatch);


// Route to find batch by batch number
router.get('/findByNumber/:number', getBatchIDFrmNum);

 router.get('/:batchId/sales', findBatchByID_Sales);

 router.get('/:batchId/expenses', findBatchByID_Expenses)


export { router as batchRoutes }
