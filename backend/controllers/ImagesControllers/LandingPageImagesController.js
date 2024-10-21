import LandingPageImage from '../../models/ImagesModel/LandingPageImagesModel.js'
import { uploadImageToFirebase } from '../../Firebase/firebaseStoring.js';

// Upload Image and Save URL to MongoDB
export const uploadLandingPageImage = async (req, res) => {
  try {
    const { section, fileName } = req.body;
    const file = req.file;

    // Upload the file to Firebase and get the download URL
    const imageUrl = await uploadImageToFirebase(file, section, fileName);

    // Save the image URL to MongoDB
    const newImage = new LandingPageImage({
      section,
      fileName,
      imageUrl,
    });
    await newImage.save();

    res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

// Fetch the latest image for a specific section
export const fetchLatestImage = async (req, res) => {
  try {
    const { section, fileName } = req.params;
    
    // Get the latest image for the section
    const latestImage = await LandingPageImage.findOne({ section, fileName }).sort({ createdAt: -1 });
    
    if (!latestImage) {
      return res.status(404).json({ message: 'No image found' });
    }

    res.status(200).json({ imageUrl: latestImage.imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch image', error: error.message });
  }
};
