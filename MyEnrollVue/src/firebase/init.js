// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg8XmBoMv3a4wdkbmTaD4vukdn9ORfVeM",
  authDomain: "myenroll-39646.firebaseapp.com",
  projectId: "myenroll-39646",
  storageBucket: "myenroll-39646.appspot.com",
  messagingSenderId: "848969558075",
  appId: "1:848969558075:web:26bc713584910a5b9dd41e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;