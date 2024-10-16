import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BASE_URL = 'https://saletracker-backend.onrender.com/api';
// Upload image to Firebase
export const uploadImageToFirebase = async (file, folder) => {
  const storage = getStorage();
  const storageRef = ref(storage, `Images/${folder}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Save image URL to MongoDB
export const saveImageToMongoDB = async (imageData) => {
    console.log(imageData);
    
  const response = await fetch(`${BASE_URL}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(imageData),
  });

  console.log(response);
  

  if (!response.ok) {
    throw new Error('Error saving image');
  }
};
