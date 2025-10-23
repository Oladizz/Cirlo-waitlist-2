// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRd0Y5F3IMUHtbzUhpGCis3xYtRtSTJ3M",
  authDomain: "cirlo-58392.firebaseapp.com",
  projectId: "cirlo-58392",
  storageBucket: "cirlo-58392.firebasestorage.app",
  messagingSenderId: "957138056185",
  appId: "1:957138056185:web:ad12754362b27fb79ec328",
  measurementId: "G-H9LYMFPGV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
