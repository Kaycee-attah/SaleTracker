const BASE_URL = 'https://saletracker-backend.onrender.com/api';

// Function to upload image to the backend
export const uploadLandingPageImage = async (file, sectionName, fileName) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('sectionName', sectionName);
  formData.append('fileName', fileName);

  try {
    const response = await fetch(`${BASE_URL}/upload-${sectionName}-image`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data; // Contains the imageUrl
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

// Function to fetch the latest image for a section
export const fetchLandingPageImage = async (sectionName) => {
  try {
    const response = await fetch(`${BASE_URL}/fetch-${sectionName}-image`);

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

// Save image URL to MongoDB (optional, if separate from upload)
export const saveLandingPageImageUrlToDB = async (imageUrl, sectionName, fileName) => {
  try {
    const response = await fetch(`${BASE_URL}/save-image-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageUrl, sectionName, fileName })
    });

    if (!response.ok) {
      throw new Error('Failed to save image URL');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving image URL to DB:', error);
    return null;
  }
};
