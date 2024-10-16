import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
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

// Middleware to parse incoming JSON data
app.use(express.json());

dotenv.config(); // Routes

// Use the expense routes
app.use('/api/expenses', expensesRoute);
// Use category routes
app.use('/api', categoryRoutes);
// Use Sales routes
app.use('/api/sales', salesRoute);
// Use the sales category routes
app.use('/api/sales/categories', salesCategoryRoute);
// Use batch routes
app.use("/api/batches", batchRoutes);

// Routes
app.use('/api', monthlyIDRoutes);

app.use('/api', getTotalsRoute)

app.use('/api/auth', userRoutes);

// Use the routes in the app
app.use('/api', adminUserRoutes);

// Use the image routes
app.use('/api', imageUrlRoutes);


app.use(cors({
    origin: ["http://localhost:5173/", "https://saletracker-frontend.onrender.com/"]
}))


// Connect to MongoDB
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, {
  
  
  dbName: "SUMUD",
})
  .then(() => {
    console.log("Successfully connected to Database");
    app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));