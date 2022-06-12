import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyBNz9iwf7heqpihayf4Nvfk64X6MG8wtho",
  authDomain: "rick-n-morty-799fa.firebaseapp.com",
  projectId: "rick-n-morty-799fa",
  storageBucket: "rick-n-morty-799fa.appspot.com",
  messagingSenderId: "292967550786",
  appId: "1:292967550786:web:3669f2bfdf23526d6f02db",
  measurementId: "G-XGGCZGGBR1"
};

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app);
