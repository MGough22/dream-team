// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, disableNetwork } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9DglPHK2AaqcYQEAbJPNdCF-SSF90RJY",
  authDomain: "dreamjournal-1ab0d.firebaseapp.com",
  projectId: "dreamjournal-1ab0d",
  storageBucket: "dreamjournal-1ab0d.firebasestorage.app",
  messagingSenderId: "806472267408",
  appId: "1:806472267408:web:0fce0ad6ba5508404b0a15",
  measurementId: "G-2R18MT8CHN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // Optional
export { db, auth };


console.log("Auth instance from firebase.js:", auth);
