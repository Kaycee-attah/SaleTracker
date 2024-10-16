// routes/imageRoutes.js
import express from 'express';
import { uploadImageUrl } from '../controllers/uploadImageController.js';
import { saveImageUrl } from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload-image-url', uploadImageUrl);

router.post('/edit-image', saveImageUrl); // Route to save image URL

export { router as imageUrlRoutes }
