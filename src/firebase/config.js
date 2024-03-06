import { initializeApp } from 'firebase/app';
import * as firebaseAuth from "firebase/auth";
import * as firestore from "firebase/firestore";
import * as storage from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd0hUiYQ-Yk8lm77fVRk7qghQLs_ZEV1A",
  authDomain: "olx-project2-98753.firebaseapp.com",
  projectId: "olx-project2-98753",
  storageBucket: "olx-project2-98753.appspot.com",
  messagingSenderId: "538638745863",
  appId: "1:538638745863:web:10a6db48ef00da04d805a2",
  measurementId: "G-CR62P2W770"
};


const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore();

const firebaseExports = { app, db, firebaseAuth, firestore, storage };
export default firebaseExports;