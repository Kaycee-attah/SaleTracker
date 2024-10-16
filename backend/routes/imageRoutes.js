// routes/imageRoutes.js
import express from 'express';
import { uploadImageUrl } from '../controllers/uploadImageController.js';
import { saveImage } from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload-image-url', uploadImageUrl);

router.post('/images', saveImage);

export { router as imageUrlRoutes }

