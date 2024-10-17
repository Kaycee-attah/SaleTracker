import { handleUploadToFirebase } from "../firebaseController";

const BASE_URL = 'https://saletracker-backend.onrender.com/api';

export const uploadLandingPageImage = async (imageFile) => {
    // const formData = new FormData();
    // formData.append('image', imageFile);
    
    
  
    // Assuming you have a function to handle the upload of the image and get its URL
    const uploadedImage = await handleUploadToFirebase(imageFile); // Placeholder function
  
    console.log(uploadedImage);
    
    return uploadedImage; // Should return { imageUrl: 'url', section: 'section-name', fileName: 'file-name' }
  };
  
  export const saveLandingPageImageUrlToDB = async (imageUrl, section, fileName) => {
    console.log(imageUrl, section, fileName);
    
    const response = await fetch(`${BASE_URL}/upload-landingpage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl, section, fileName }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to save image URL to database');
    }
    
    return await response.json();
  };
  