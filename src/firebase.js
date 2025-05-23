import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9d2uB64FXaqnpaTTtDG9zaqD1mZBJT1c",
  authDomain: "adityastremstudios.firebaseapp.com",
  projectId: "adityastremstudios",
  storageBucket: "adityastremstudios.firebasestorage.app",
  messagingSenderId: "380118333331",
  appId: "1:380118333331:web:eb25b04535c1ec430fda66",
  measurementId: "G-LPP1LG9647"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
