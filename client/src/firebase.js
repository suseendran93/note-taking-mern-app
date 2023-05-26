// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv1omFXxfWYPOHTFrpcbvSdd1RXyblS08",
  authDomain: "notefy-1d295.firebaseapp.com",
  projectId: "notefy-1d295",
  storageBucket: "notefy-1d295.appspot.com",
  messagingSenderId: "72941336440",
  appId: "1:72941336440:web:3d40cd08e077659b8b3a8d",
  measurementId: "G-2ZBHW2TJQ2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
