import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import { expensesRoute } from "./routes/expenseRoute.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { salesRoute } from "./routes/salesRoute.js";
import { salesCategoryRoute } from "./routes/salesCategoryRoute.js";
import { batchRoutes } from "./routes/batchRoutes.js";
import { monthlyIDRoutes } from "./routes/monthlyIDRoutes.js";
import { getTotalsRoute } from "./routes/getTotalsRoute.js";
import { userRoutes } from "./routes/UsersRoutes/userRoutes.js";
import { adminUserRoutes } from "./routes/UsersRoutes/adminUserRoutes.js";
import { imageUrlRoutes } from "./routes/imageRoutes.js";

// Initialize Express App
const app = express();
dotenv.config();

// Middleware to parse incoming JSON data
app.use(express.json());

// CORS Middleware
app.use(cors({
    origin: ["https://saletracker-frontend.onrender.com", "http://localhost:5173"],  // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // Allow credentials (cookies, authorization headers, etc.)
}));

// Handle CORS preflight requests for all routes
app.options('*', cors());

// Routes
app.use('/api/expenses', expensesRoute);  // Expenses routes
app.use('/api', categoryRoutes);  // Category routes
app.use('/api/sales', salesRoute);  // Sales routes
app.use('/api/sales/categories', salesCategoryRoute);  // Sales categories routes
app.use("/api/batches", batchRoutes);  // Batch routes
app.use('/api', monthlyIDRoutes);  // Monthly ID routes
app.use('/api', getTotalsRoute);  // Totals routes
app.use('/api/auth', userRoutes);  // Authentication routes
app.use('/api', adminUserRoutes);  // Admin user routes
app.use('/api', imageUrlRoutes);  // Image routes

// Connect to MongoDB
const port = process.env.PORT || 10000;
mongoose.connect(process.env.MONGO_URL, {
    dbName: "SUMUD",
})
  .then(() => {
    console.log("Successfully connected to Database");
    app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));

// Error Handling for Routes Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
