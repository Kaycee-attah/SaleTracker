 // Adjust the import based on your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
// src/controllers/imageController.js

export const uploadImage = async (file) => {
  const BASE_URL = 'https://saletracker-backend.onrender.com/api';
  if (!file) return null;

  const storageRef = ref(storage, `uploads/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    // Sending the image URL to your backend
    const response = await fetch(`${BASE_URL}/upload-image-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: url }),
    });

    if (!response.ok) {
      throw new Error('Failed to upload image URL');
    }

    const data = await response.json();
    return data.image; // Return the saved image object if needed
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
