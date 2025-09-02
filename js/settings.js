import { db, auth } from "./firebase-config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function userDoc(uid) {
  return doc(db, "users", uid);
}

async function loadSettings(uid) {
  const snap = await getDoc(userDoc(uid));
  if (snap.exists()) {
    const data = snap.data();
    document.getElementById("profileName").value = data.name || "";
    document.getElementById("profileEmail").value = data.email || "";
    document.getElementById("darkMode").checked = data.darkMode || false;
    document.getElementById("largeText").checked = data.largeText || false;
  }
}

async function saveSettings(uid) {
  await setDoc(userDoc(uid), {
    name: document.getElementById("profileName").value,
    email: document.getElementById("profileEmail").value,
    darkMode: document.getElementById("darkMode").checked,
    largeText: document.getElementById("largeText").checked
  }, { merge: true });

  applyTheme(
    document.getElementById("darkMode").checked,
    document.getElementById("largeText").checked
  );
}

function applyTheme(dark, large) {
  document.body.classList.toggle("dark-mode", dark);
  document.body.classList.toggle("large-text", large);
}

document.querySelector(".btn.save")?.addEventListener("click", () => {
  const user = auth.currentUser;
  if (user) saveSettings(user.uid);
});

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadSettings(user.uid);
  } else {
    console.log("Not logged in");
  }
});
