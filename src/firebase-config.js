import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6k8iNq3803ZYmicNayraGRncd_xJTC4g",
  authDomain: "open-day-18e43.firebaseapp.com",
  projectId: "open-day-18e43",
  storageBucket: "open-day-18e43.appspot.com",
  messagingSenderId: "1034275723641",
  appId: "1:1034275723641:web:1f41ff256005a05b70f7a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;