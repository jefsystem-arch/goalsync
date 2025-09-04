// Firebase App (the core Firebase SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config (replace with your project’s values)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "goalsync-app.firebaseapp.com",
  projectId: "goalsync-app",
  storageBucket: "goalsync-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);