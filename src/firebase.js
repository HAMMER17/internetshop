import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVziNurp1VTmyPOOAwKPKZ20PgERHcsmQ",
  authDomain: "internetshop-6bfb2.firebaseapp.com",
  projectId: "internetshop-6bfb2",
  storageBucket: "internetshop-6bfb2.appspot.com",
  messagingSenderId: "913766891103",
  appId: "1:913766891103:web:e3eb76e9572bdbdc3de5ea"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
