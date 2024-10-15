import express from 'express'
import { deleteUser, getAllUsers, loginUser, registerUser, updateUserRole } from '../../controllers/UsersControllers/userController.js';



const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// GET all users
router.get('/users', getAllUsers);

// PATCH update user role
router.patch('/users/:id', updateUserRole);

// DELETE user
router.delete('/users/:id', deleteUser);

export {router as userRoutes}
