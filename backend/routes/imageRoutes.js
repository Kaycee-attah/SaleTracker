
import express from 'express';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { uploadImageUrl } from '../controllers/ImagesControllers/uploadImageController.js';
import { fetchImageUrlById, getLatestImage, saveImageUrl } from '../controllers/ImagesControllers/PicturesController.js';
import { fetchCassavaFlourImage, fetchHeroImage, fetchLatestImage, fetchProduct1Image, fetchProduct2Image, uploadCassavaFlourImage, uploadHeroImage, uploadLandingPageImage, uploadProduct1Image, uploadProduct2Image } from '../controllers/ImagesControllers/LandingPageImagesController.js';

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



// Image upload routes
router.post('/upload-hero-image', uploadHeroImage);
router.post('/upload-product1-image', uploadProduct1Image);
router.post('/upload-product2-image', uploadProduct2Image);
router.post('/upload-cassava-image', uploadCassavaFlourImage);

// Fetch latest image routes
router.get('/fetch-hero-image', fetchHeroImage);
router.get('/fetch-product1-image', fetchProduct1Image);
router.get('/fetch-product2-image', fetchProduct2Image);
router.get('/fetch-cassava-image', fetchCassavaFlourImage);



export { router as imageUrlRoutes }
