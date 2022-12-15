// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore" ;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUx_xxnzMqtOsI4O9w1nQ6xp7uB62rJoQ",
  authDomain: "int305fb113.firebaseapp.com",
  projectId: "int305fb113",
  storageBucket: "int305fb113.appspot.com",
  messagingSenderId: "53596736919",
  appId: "1:53596736919:web:84a45a31c9efd9269c08d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore()

export default db 

