import express from 'express';
import { getTotals } from '../controllers/totalsControllers/getTotalsController.js';
import { getTotalWeeks } from '../controllers/totalsControllers/getTotalWeeksController.js';
import { getTotalDays } from '../controllers/totalsControllers/getTotalDaysController.js';
import { getTotalMonths } from '../controllers/totalsControllers/getTotalMonthsController.js';
import { getTotalYears } from '../controllers/totalsControllers/getTotalYearsController.js';

const router = express.Router();
// Define the route for fetching sales and expense totals
router.get('/totals', getTotals);

// Define the route for fetching sales and expense totals
router.get('/years/totals', getTotalYears);

// Define the route for fetching sales and expense totals
router.get('/months/totals', getTotalMonths);

// Define the route for fetching sales and expense totals
router.get('/weeks/totals', getTotalWeeks);

// Define the route for fetching sales and expense totals
router.get('/days/totals', getTotalDays);

export { router as getTotalsRoute }