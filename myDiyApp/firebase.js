// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBohLJA2NyrD4-kkgpB_kzaqHZwXYh4wHs",
  authDomain: "mydiyapp-59552.firebaseapp.com",
  projectId: "mydiyapp-59552",
  storageBucket: "mydiyapp-59552.firebasestorage.app",
  messagingSenderId: "1008602274323",
  appId: "1:1008602274323:web:7241e636dfac813a7e3de6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
