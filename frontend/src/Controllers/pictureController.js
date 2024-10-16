import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Function to upload image to Firebase and return the download URL
export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Return the uploaded image URL
};

// Function to save image URL to MongoDB using fetch
export const saveImageUrl = async (url) => {
    try {
        const response = await fetch('/api/images/upload-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }), // Send the URL to MongoDB
        });

        if (!response.ok) {
            throw new Error('Error saving image URL to MongoDB');
        }

        const data = await response.json(); // Parse the response data
        return data;
    } catch (error) {
        throw new Error('Error saving image URL to MongoDB: ' + error.message);
    }
};
