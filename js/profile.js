import { getAuth, updateProfile, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileAvatar = document.getElementById("profileAvatar");
  const profileForm = document.getElementById("profileForm");

  onAuthStateChanged(auth, user => {
    if (user) {
      profileName.textContent = user.displayName || "Anonymous";
      profileEmail.textContent = user.email;
      if (user.photoURL) profileAvatar.src = user.photoURL;
    }
  });

  if (profileForm) {
    profileForm.addEventListener("submit", async e => {
      e.preventDefault();
      const displayName = document.getElementById("displayName").value;
      const avatarFile = document.getElementById("avatarUpload").files[0];

      try {
        await updateProfile(auth.currentUser, {
          displayName
          // Avatar upload to Firebase Storage can be added later
        });
        alert("✅ Profile updated!");
        if (displayName) profileName.textContent = displayName;
      } catch (err) {
        alert("❌ Update failed: " + err.message);
      }
    });
  }
});