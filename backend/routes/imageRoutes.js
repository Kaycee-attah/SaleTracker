// routes/imageRoutes.js
import express from 'express';
import { uploadImageUrl } from '../controllers/uploadImageController.js';
import { fetchImageUrlById, saveImageUrl } from '../controllers/PicturesController.js';

const router = express.Router();

router.post('/upload-image-url', uploadImageUrl);

router.post('/save-image', saveImageUrl); // Route to save image URL

// Define route to fetch image URL by ID
router.get('/fetch-image/:id', fetchImageUrlById);


export { router as imageUrlRoutes }
