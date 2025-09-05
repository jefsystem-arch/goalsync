function settingsInit() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const themeButtons = document.querySelectorAll(".theme-btn");
  const languageSelect = document.getElementById("languageSelect");

  // Load saved preferences
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const savedTheme = localStorage.getItem("themeColor");
  const savedLang = localStorage.getItem("language");

  if (darkModeToggle) {
    darkModeToggle.checked = savedDarkMode;
    toggleDarkMode(savedDarkMode);
    darkModeToggle.addEventListener("change", () => {
      toggleDarkMode(darkModeToggle.checked);
      localStorage.setItem("darkMode", darkModeToggle.checked);
    });
  }

  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      document.body.setAttribute("data-theme", color);
      localStorage.setItem("themeColor", color);
    });
  });

  if (languageSelect) {
    if (savedLang) languageSelect.value = savedLang;
    languageSelect.addEventListener("change", () => {
      localStorage.setItem("language", languageSelect.value);
    });
  }
}

function toggleDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

function applySavedPreferences() {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  toggleDarkMode(savedDarkMode);

  const savedTheme = localStorage.getItem("themeColor");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  }
}
