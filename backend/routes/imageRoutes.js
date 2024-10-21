
import express from 'express';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { uploadImageUrl } from '../controllers/ImagesControllers/uploadImageController.js';
import { fetchImageUrlById, getLatestImage, saveImageUrl } from '../controllers/ImagesControllers/PicturesController.js';
import { fetchLatestImage, uploadLandingPageImage } from '../controllers/ImagesControllers/LandingPageImagesController.js';

const router = express.Router();

router.post('/upload-image-url', uploadImageUrl);

router.post('/save-image', saveImageUrl); // Route to save image URL

// Define route to fetch image URL by ID
router.get('/fetch-image/:id', fetchImageUrlById);

// Route to get the most recent image
router.get('/latest-image', getLatestImage);


// Multer setup for file uploads

// Route for uploading images
router.post('/upload-image', upload.single('image'), uploadLandingPageImage);

// Route for fetching the latest image
router.get('/fetch-image/:section/:fileName', fetchLatestImage);



export { router as imageUrlRoutes }
