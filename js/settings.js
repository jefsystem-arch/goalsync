// SETTINGS PAGE LOGIC
function initSettings() {
  console.log("⚙️ Settings page loaded");

  // --- DARK MODE ---
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }
  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkModeToggle.checked);
      localStorage.setItem("darkMode", darkModeToggle.checked);
    });
  }

  // --- THEME COLORS ---
  const colorButtons = document.querySelectorAll(".color-btn");
  const savedTheme = localStorage.getItem("themeColor");
  if (savedTheme) document.body.setAttribute("data-theme", savedTheme);

  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const color = btn.dataset.color;
      document.body.setAttribute("data-theme", color);
      localStorage.setItem("themeColor", color);
    });
  });

  // --- LANGUAGE SELECTOR ---
  const langSelect = document.getElementById("languageSelect");
  const savedLang = localStorage.getItem("language") || "en";
  if (langSelect) langSelect.value = savedLang;

  if (langSelect) {
    langSelect.addEventListener("change", () => {
      localStorage.setItem("language", langSelect.value);
      alert(`Language switched to: ${langSelect.value}`);
      // TODO: later load translations dynamically
    });
  }

  // --- PROFILE INFO ---
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  if (profileName) profileName.textContent = "Jeff";
  if (profileEmail) profileEmail.textContent = "jeff@example.com";
}
