// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCMNX5IdH1Uv5mwCUgxjmkBdEICc8ai5BU',
  authDomain: 'ofblog-31e48.firebaseapp.com',
  projectId: 'ofblog-31e48',
  storageBucket: 'ofblog-31e48.appspot.com',
  messagingSenderId: '211069040277',
  appId: '1:211069040277:web:92be1ce91242fb744f8d9c',
  measurementId: 'G-RCESVX0RSN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);

export default db;
