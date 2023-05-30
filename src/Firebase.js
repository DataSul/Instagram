import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDIzj-cH7KapqEEwkCyHa-tKadzF2vA_o4",
  authDomain: "instagram-f82ad.firebaseapp.com",
  projectId: "instagram-f82ad",
  storageBucket: "instagram-f82ad.appspot.com",
  messagingSenderId: "87434901365",
  appId: "1:87434901365:web:4eead9ee4064fad012053c",
  measurementId: "G-JBXD828955",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, db, auth, storage };
