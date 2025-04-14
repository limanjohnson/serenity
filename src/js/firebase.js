// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZWJxSVCI9k3COgiGayKynmCjWXbvb2VE",
  authDomain: "serenity-7ea4a.firebaseapp.com",
  projectId: "serenity-7ea4a",
  storageBucket: "serenity-7ea4a.firebasestorage.app",
  messagingSenderId: "62326254763",
  appId: "1:62326254763:web:aaeb200daf539a16f49bee",
  measurementId: "G-QM3MSLSJMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };