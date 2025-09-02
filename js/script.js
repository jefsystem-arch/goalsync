// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Load saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(newTheme);
});

// Mobile nav toggle
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});
