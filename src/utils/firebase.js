// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkMTYbyrREQrgxhbqiEGxvXPf1S0swfEE",
    authDomain: "netflixgpt-16e72.firebaseapp.com",
    projectId: "netflixgpt-16e72",
    storageBucket: "netflixgpt-16e72.firebasestorage.app",
    messagingSenderId: "197505281888",
    appId: "1:197505281888:web:411baaa7ff0365390fb805",
    measurementId: "G-F2HD44B2WE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();