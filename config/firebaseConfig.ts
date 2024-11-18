// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "verocasaai.firebaseapp.com",
  projectId: "verocasaai",
  storageBucket: "verocasaai.firebasestorage.app",
  messagingSenderId: "882535301146",
  appId: "1:882535301146:web:a2e85f9182e78b7d8851a3",
  measurementId: "G-VB6JF8NHER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);