import Image from "../../models/ImagesModel/ImagesModel.js";

// Function to save image URL to MongoDB
export const saveImageUrl = async (req, res) => {
    const { url } = req.body; // Get URL from request body

    try {
        const newImage = new Image({ url }); // Create new image document
        await newImage.save(); // Save to MongoDB
        return res.status(201).json({ success: true, message: 'Image URL saved successfully!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to save image URL', error });
    }
};

// Controller to fetch image URL by ID
export const fetchImageUrlById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the image document by ID
        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Return the image URL
        res.json({ url: image.url });
    } catch (error) {
        console.error('Error fetching image URL:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch the most recent image
export const getLatestImage = async (req, res) => {
    try {
        // Find the most recent image by sorting based on creation time (createdAt)
        const latestImage = await Image.findOne().sort({ createdAt: -1 }).exec();
        if (latestImage) {
            res.status(200).json({
                imageUrl: latestImage.imageUrl,
                imageId: latestImage._id,
            });
        } else {
            res.status(404).json({ message: 'No image found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the latest image', error });
    }
};
