import admin from 'firebase-admin';
import serviceAccount from './firebaseAdminSDK.json' assert { type: 'json' }; // Firebase service account JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'quiz-pdf-storage.appspot.com' // Replace with your Firebase bucket name
});

const bucket = admin.storage().bucket();

export default bucket;

