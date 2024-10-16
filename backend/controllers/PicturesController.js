import Picture from "../models/PictureModel.js";

// Function to save image URL to MongoDB
export const saveImageUrl = async (req, res) => {
    const { url } = req.body; // Get URL from request body

    try {
        const newImage = new Picture({ url }); // Create new image document
        await newImage.save(); // Save to MongoDB
        return res.status(201).json({ success: true, message: 'Image URL saved successfully!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to save image URL', error });
    }
};
