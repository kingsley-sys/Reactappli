// From my firebase account
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"; // since we used firestore we should import it
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVtUTEXb6--LtW4M5oSkDWBEe1VspC7X4",
  authDomain: "social-media-project-43806.firebaseapp.com",
  projectId: "social-media-project-43806",
  storageBucket: "social-media-project-43806.appspot.com",
  messagingSenderId: "788968299930",
  appId: "1:788968299930:web:1a9d11f6bbb7f1fb462e23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);

export const Provider = new GoogleAuthProvider();

export const db = getFirestore(app); // and use fire store Database this way
