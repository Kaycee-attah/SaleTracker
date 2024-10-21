import { storage } from '../../Firebase/firebase.js';
import { HeroImage, Product1Image, Product2Image, CassavaFlourImage } from '../../models/ImagesModel/LandingPageImagesModel.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Helper to upload image to Firebase and return the URL
const uploadImageToFirebase = async (fileBuffer, fileName, folder) => {
  const storageRef = ref(storage, `${folder}/${fileName}`);
  const snapshot = await uploadBytes(storageRef, fileBuffer);
  return await getDownloadURL(snapshot.ref);
};

// Controller to handle image upload for each section
const uploadImage = async (req, res, Model, folder) => {
  try {
    const { buffer } = req.file; // Expecting file from frontend (buffer)
    const { fileName, sectionName } = req.body;

    // Upload image to Firebase
    const imageUrl = await uploadImageToFirebase(buffer, fileName, folder);

    // Save the image URL to MongoDB
    const image = new Model({ sectionName, fileName, imageUrl });
    await image.save();

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

// Controller to fetch the latest image for each section
const fetchLatestImage = async (req, res, Model) => {
  try {
    const latestImage = await Model.findOne().sort({ uploadedAt: -1 });
    if (!latestImage) {
      return res.status(404).json({ message: 'No image found' });
    }
    res.status(200).json({ imageUrl: latestImage.imageUrl });
  } catch (error) {
    console.error('Error fetching latest image:', error);
    res.status(500).json({ message: 'Failed to fetch image', error: error.message });
  }
};

// Export controllers for each section
export const uploadHeroImage = (req, res) => uploadImage(req, res, HeroImage, 'landing');
export const uploadProduct1Image = (req, res) => uploadImage(req, res, Product1Image, 'products');
export const uploadProduct2Image = (req, res) => uploadImage(req, res, Product2Image, 'products');
export const uploadCassavaFlourImage = (req, res) => uploadImage(req, res, CassavaFlourImage, 'cassava');

export const fetchHeroImage = (req, res) => fetchLatestImage(req, res, HeroImage);
export const fetchProduct1Image = (req, res) => fetchLatestImage(req, res, Product1Image);
export const fetchProduct2Image = (req, res) => fetchLatestImage(req, res, Product2Image);
export const fetchCassavaFlourImage = (req, res) => fetchLatestImage(req, res, CassavaFlourImage);
