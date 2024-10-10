// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-27ff3.firebaseapp.com",
  projectId: "netflixgpt-27ff3",
  storageBucket: "netflixgpt-27ff3.appspot.com",
  messagingSenderId: "500988291841",
  appId: "1:500988291841:web:3f31c8b6ceeffc3fbd0900",
  measurementId: "G-X4XJSJ13P8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();