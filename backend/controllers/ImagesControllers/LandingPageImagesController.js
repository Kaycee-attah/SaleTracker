import LandingPageImage from "../../models/ImagesModel/LandingPageImagesModel.js";


export const uploadLandingPageImageUrl = async (req, res) => {
  const { imageUrl, section, fileName } = req.body;

  if (!imageUrl || !section || !fileName) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newImage = new LandingPageImage({ imageUrl, section, fileName });
    await newImage.save();
    return res.status(201).json({ message: 'Image URL saved successfully', newImage });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
