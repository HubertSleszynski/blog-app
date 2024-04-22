// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-lvQWG3gpoRm0ZHdxUnTTXjCeXRbGnLk",
  authDomain: "blog-website-69054.firebaseapp.com",
  projectId: "blog-website-69054",
  storageBucket: "blog-website-69054.appspot.com",
  messagingSenderId: "177100195173",
  appId: "1:177100195173:web:80fcc1cba05ed8704c4d8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
