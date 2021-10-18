import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;

/// helper functions
/**
 * Gets a users/{uid} document from username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const collectionQuery = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await collectionQuery.get()).docs[0];

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
    createdAt: data?.createdAt.toMillis(),
    updatedAt: data?.updatedAt.toMillis(),
  };
}
