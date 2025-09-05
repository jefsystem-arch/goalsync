function initProfile() {
  const profile = document.getElementById("profileCard");
  if (!profile) return;
  profile.innerHTML = "<p>Name: Jeff<br>Email: example@email.com</p>";
}