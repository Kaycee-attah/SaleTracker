 // Adjust the import based on your Firebase configuration
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { fetchImageUrlById } from '../../../backend/controllers/PicturesController';

const BASE_URL = 'https://saletracker-backend.onrender.com/api';

export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `uploads/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    

    // Sending the image URL to your backend
    const response = await fetch(`${BASE_URL}/upload-image-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: url }),
    });
    console.log(response);
    

    if (!response.ok) {
      throw new Error('Failed to upload image URL');
    }

    const data = await response.json();
    console.log(data);
    
    return data.image; // Return the saved image object if needed
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};


