import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginForm) {
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Logged in!");
      } catch (err) {
        alert("❌ Login failed: " + err.message);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async e => {
      e.preventDefault();
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created!");
      } catch (err) {
        alert("❌ Sign up failed: " + err.message);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        alert("👋 Logged out!");
      } catch (err) {
        alert("❌ Logout failed: " + err.message);
      }
    });
  }
});