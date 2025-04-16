// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA64eDkQZqMuGBpwX4slbsuCihnNcnWUkg",
  authDomain: "chatspace-e296f.firebaseapp.com",
  projectId: "chatspace-e296f",
  storageBucket: "chatspace-e296f.appspot.com",
  messagingSenderId: "678084257767",
  appId: "1:678084257767:web:49b9a52217c50078e8bf42",
  measurementId: "G-DSE1SMHSZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);