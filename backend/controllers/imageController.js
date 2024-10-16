import Picture from "../models/PictureModel.js";


export const saveImage = async (req, res) => {
  const { folder, imageUrl } = req.body;

  try {
    const newImage = new Picture({ folder, imageUrl });
    await newImage.save();
    res.status(201).json({ message: 'Image saved successfully', imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error saving image', error });
  }
};
