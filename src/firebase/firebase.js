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
  apiKey: "AIzaSyBGS9Ybh7DFJ9Pa1xBWRVoHmlBo2IYkH3A",
  authDomain: "urban-sustainable-move-a-29f48.firebaseapp.com",
  databaseURL: "https://urban-sustainable-move-a-29f48-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urban-sustainable-move-a-29f48",
  storageBucket: "urban-sustainable-move-a-29f48.firebasestorage.app",
  messagingSenderId: "1063599808237",
  appId: "1:1063599808237:web:1d90c9564b5514682e36e4",
  measurementId: "G-J8W5F29P7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;