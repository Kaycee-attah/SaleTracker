// routes/imageRoutes.js
import express from 'express';
import { uploadImageUrl } from '../controllers/uploadImageController.js';

const router = express.Router();

router.post('/upload-image-url', uploadImageUrl);

export { router as imageUrlRoutes }
