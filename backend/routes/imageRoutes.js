// routes/imageRoutes.js
import express from 'express';
import { uploadImageUrl } from '../controllers/ImagesControllers/uploadImageController.js';
import { fetchImageUrlById, getLatestImage, saveImageUrl } from '../controllers/ImagesControllers/PicturesController.js';
import { uploadLandingPageImageUrl } from '../controllers/ImagesControllers/LandingPageImagesController.js';

const router = express.Router();

router.post('/upload-image-url', uploadImageUrl);

router.post('/save-image', saveImageUrl); // Route to save image URL

// Define route to fetch image URL by ID
router.get('/fetch-image/:id', fetchImageUrlById);

// Route to get the most recent image
router.get('/latest-image', getLatestImage);

router.post('/upload-landingpage', uploadLandingPageImageUrl);


export { router as imageUrlRoutes }
