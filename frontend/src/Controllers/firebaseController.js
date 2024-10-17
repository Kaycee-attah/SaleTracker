import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const handleUploadToFirebase = async (imageFile) => {
  try {
    console.log(imageFile);
    
    const file = imageFile; // Assuming the file is in the formData
    const storageRef = ref(storage, `images/${file.name}`); // You can adjust the path as necessary

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    return { imageUrl: downloadURL, fileName: file.name}; // Return the image URL
  } catch (error) {
    console.error('Error uploading to Firebase:', error);
    return null; // Or handle the error as necessary
  }
};
