import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDfWzvmRhtPdqw62XOjZK5IcO2ADMwqIwE",
    authDomain: "quiz-app-dceee.firebaseapp.com",
    projectId: "quiz-app-dceee",
    storageBucket: "quiz-app-dceee.firebasestorage.app",
    messagingSenderId: "208760921957",
    appId: "1:208760921957:web:2385d9b38c8d8bd8ebcb8c",
    measurementId: "G-6EMH04W9DX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app)