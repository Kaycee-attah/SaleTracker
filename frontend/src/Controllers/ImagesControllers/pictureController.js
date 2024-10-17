import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
const BASE_URL = 'https://saletracker-backend.onrender.com/api';


// Function to upload image to Firebase and return the download URL
export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url; // Return the uploaded image URL
};

// Function to save image URL to MongoDB using fetch
export const saveImageUrl = async (url) => {
    console.log(url);
    
    try {
        const response = await fetch(`${BASE_URL}/save-image`, {
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

// Controllers/imageController.js

// Function to fetch image URL from the backend using the image ID
export const fetchImageUrlById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/fetch-image/${id}`);

        if (!response.ok) {
            throw new Error('Error fetching image URL');
        }

        const data = await response.json();
        return data.url; // Return the image URL
    } catch (error) {
        throw new Error('Error fetching image URL: ' + error.message);
    }
};

