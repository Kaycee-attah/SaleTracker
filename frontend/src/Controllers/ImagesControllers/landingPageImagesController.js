const BASE_URL = 'https://saletracker-backend.onrender.com/api';

export const uploadLandingPageImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${BASE_URL}/upload-image`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Image upload failed:', error);
  }
};

export const saveLandingPageImageUrlToDB = async (imageUrl, section, fileName) => {
  try {
    const response = await fetch(`${BASE_URL}/save-image-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl,
        section,
        fileName,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Failed to save image URL to DB:', error);
  }
};

export const fetchLandingPageImage = async (section, fileName) => {
  try {
    const response = await fetch(`${BASE_URL}/fetch-image/${section}/${fileName}`);
    const data = await response.json();

    if (response.ok) {
      return data.imageUrl;
    } else {
      throw new Error('Failed to fetch image');
    }
  } catch (error) {
    console.error(error.message);
  }
};
