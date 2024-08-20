// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import the Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQZ0Fd3COPXMSdzhQQDpONt47U8Fi3Om0",
  authDomain: "amango.firebaseapp.com",
  databaseURL: "https://amango.firebaseio.com",
  projectId: "amango",
  storageBucket: "amango.appspot.com",
  messagingSenderId: "1072341613770",
  appId: "1:1072341613770:web:4691dc64dfc004eabe4833"
};

// Initialize Firebase only if there are no initialized apps
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get a Firestore instance
const db = getFirestore(app);

export { db };
