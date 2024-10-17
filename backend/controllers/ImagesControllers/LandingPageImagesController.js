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

export const fetchImageBySection = async (req, res) => {
    const { section, name } = req.params;
  
    try {
      const image = await LandingPageImage.findOne({ section, fileName: name });
  
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.status(200).json({ imageUrl: image.imageUrl });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching image', error });
    }
  };