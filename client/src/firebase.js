// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "opendoor-db7d9.firebaseapp.com",
  projectId: "opendoor-db7d9",
  storageBucket: "opendoor-db7d9.appspot.com",
  messagingSenderId: "28724812891",
  appId: "1:28724812891:web:dfe6bd9850fb76dca8f37e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;