// import firebase from 'firebase/app'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUx4IKzndWJRVDponK5-CuzW_R5h6NOFI",
  authDomain: "blog-a17a0.firebaseapp.com",
  projectId: "blog-a17a0",
  storageBucket: "blog-a17a0.appspot.com",
  messagingSenderId: "706432729720",
  appId: "1:706432729720:web:586e2e6939bf4b7203e38d",
  measurementId: "G-5WN1GXMG4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app);