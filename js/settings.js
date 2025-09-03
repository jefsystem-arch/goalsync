// Load saved preferences
window.addEventListener("DOMContentLoaded", () => {
  // Dark mode
  if (localStorage.getItem("themeMode") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("darkModeToggle").checked = true;
  }

  // Theme color
  const savedTheme = localStorage.getItem("themeColor");
  if (savedTheme) {
    document.body.classList.add("theme-" + savedTheme);
    document.querySelectorAll(".swatch").forEach(s => {
      s.classList.remove("active");
      if (s.dataset.color === savedTheme) s.classList.add("active");
    });
  }

  // Language
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    document.getElementById("languageSelect").value = savedLang;
  }

  // Assistant FAB toggle
  if (localStorage.getItem("assistantFAB") === "on") {
    document.getElementById("assistantToggle").checked = true;
    const fab = document.querySelector(".assistant-fab");
    if (fab) fab.style.display = "block";
  }
});

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("themeMode", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("themeMode", "light");
  }
});

// Theme Color
document.querySelectorAll(".swatch").forEach(swatch => {
  swatch.addEventListener("click", function () {
    document.body.classList.remove("theme-blue","theme-green","theme-red","theme-purple","theme-orange","theme-teal");
    document.body.classList.add("theme-" + this.dataset.color);
    localStorage.setItem("themeColor", this.dataset.color);
    document.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    this.classList.add("active");
  });
});

// Language
document.getElementById("languageSelect").addEventListener("change", function () {
  localStorage.setItem("language", this.value);
  alert("Language set to " + this.options[this.selectedIndex].text + " (translations coming soon)");
});

// Assistant FAB
document.getElementById("assistantToggle").addEventListener("change", function () {
  const fab = document.querySelector(".assistant-fab");
  if (this.checked) {
    if (fab) fab.style.display = "block";
    localStorage.setItem("assistantFAB", "on");
  } else {
    if (fab) fab.style.display = "none";
    localStorage.setItem("assistantFAB", "off");
  }
});
