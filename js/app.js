// app.js - Global Theme & Settings Handler + Logout

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // --- Load saved theme (light/dark) ---
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // --- Load saved accent color ---
  const savedColor = localStorage.getItem("themeColor") || "#3b82f6"; // default blue
  root.style.setProperty("--theme-color", savedColor);

  // --- Settings Page Elements ---
  const themeToggle = document.getElementById("theme-toggle");
  const colorPicker = document.getElementById("color-picker");

  if (themeToggle) {
    // Set toggle state
    themeToggle.checked = savedTheme === "dark";

    // Listen for changes
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }

  if (colorPicker) {
    // Set picker to saved color
    colorPicker.value = savedColor;

    // Listen for changes
    colorPicker.addEventListener("input", () => {
      const newColor = colorPicker.value;
      root.style.setProperty("--theme-color", newColor);
      localStorage.setItem("themeColor", newColor);
    });
  }

  // --- Logout Button Logic ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Clear localStorage and redirect
      localStorage.clear();
      window.location.href = "../index.html";
    });
  }
});
