// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjmumaptq4boHostjsDcdC0PKC2JWopBs",
  authDomain: "sales-tracker-1bf57.firebaseapp.com",
  projectId: "sales-tracker-1bf57",
  storageBucket: "sales-tracker-1bf57.appspot.com",
  messagingSenderId: "422087140884",
  appId: "1:422087140884:web:e81fe6384b8e6521b9e901"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

