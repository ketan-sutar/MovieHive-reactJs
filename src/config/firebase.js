// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqhIFle-AurBp6hhRnQT8E-5yZ4BW3szc",
  authDomain: "movie-box-5facd.firebaseapp.com",
  projectId: "movie-box-5facd",
  storageBucket: "movie-box-5facd.firebasestorage.app",
  messagingSenderId: "353962686292",
  appId: "1:353962686292:web:28bba1c8ad093324d03ac1",
  measurementId: "G-LFSB9EWNK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { auth, provider };
