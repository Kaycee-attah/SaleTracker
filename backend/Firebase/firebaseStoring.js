import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';


export const uploadImageToFirebase = async (file, section, fileName) => {
  try {
    const storageRef = ref(storage, `${section}/${fileName}`);

    // Upload file to Firebase
    const snapshot = await uploadBytes(storageRef, file.buffer);
    
    // Get the download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  } catch (error) {
    throw new Error('Error uploading image to Firebase: ' + error.message);
  }
};
