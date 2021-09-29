// import firebase from 'firebase/app'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
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
  measurementId: "G-5WN1GXMG4G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

/// helper functions
/**
 * Gets a users/{uid} document from username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  const collectionQuery = query(
    usersRef,
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(collectionQuery)).docs[0];

  return userDoc;
}

/**
 * convert timestamp type to JSON
 * @param {DocumentSnapshot} doc
 */
export function postsToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
