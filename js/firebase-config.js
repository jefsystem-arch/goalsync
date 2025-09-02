// ⚠️ Replace with your Firebase project credentials
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsAYm1zKV4_msAe24S7gHoTFw66Av1ojA",
  authDomain: "goalsync-e933c.firebaseapp.com",
  projectId: "goalsync-e933c",
  storageBucket: "goalsync-e933c.appspot.com",   // ✅ fixed here
  messagingSenderId: "975743345052",
  appId: "1:975743345052:web:016313557eb2f594eee859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
