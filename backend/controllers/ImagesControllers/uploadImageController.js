import Image from "../../models/ImagesModel/ImagesModel.js";


export const uploadImageUrl = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: 'Image URL is required' });
  }

  try {
    const newImage = new Image({ imageUrl });
    await newImage.save();
    return res.status(201).json({ message: 'Image URL saved successfully', image: newImage });
  } catch (error) {
    console.error('Error saving image URL:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
