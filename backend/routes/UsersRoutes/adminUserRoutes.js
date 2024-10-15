import express from 'express';
import multer from 'multer'; // For handling file uploads
import { createOrUpdateAdminUser, getAdminUser } from '../../controllers/UsersControllers/adminUserController.js';
import { getCurreneUser } from '../../controllers/UsersControllers/getCurrentUser.js';
import { getAdminUserIdByUserId } from '../../controllers/UsersControllers/getAdminUserIDByUserIDController.js';

const router = express.Router();
// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET Admin User by userId
router.get('/admin-users/:userId', getAdminUser);

router.get('/admin-user/id/:userId', getAdminUserIdByUserId);

// POST/PUT Create or Update Admin User with optional image upload
router.post('/admin-users', upload.single('image'), createOrUpdateAdminUser);

// Route to get current user's data by email
router.get('/current-user/:email', getCurreneUser);

export {router as adminUserRoutes}


