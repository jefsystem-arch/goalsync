document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkModeToggle");
  const themeButtons = document.querySelectorAll("[data-theme]");
  const langSelect = document.getElementById("languageSelect");
  const fabToggle = document.getElementById("fabToggle");
  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkToggle.checked);
      localStorage.setItem("darkMode", darkToggle.checked);
    });
    if (localStorage.getItem("darkMode") === "true") {
      darkToggle.checked = true;
      document.body.classList.add("dark-mode");
    }
  }
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      document.body.className = theme;
      localStorage.setItem("theme", theme);
    });
  });
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.body.classList.add(savedTheme);
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      const lang = langSelect.value;
      localStorage.setItem("language", lang);
      loadLanguage(lang);
    });
    const savedLang = localStorage.getItem("language") || "en";
    langSelect.value = savedLang;
    loadLanguage(savedLang);
  }
  if (fabToggle) {
    fabToggle.addEventListener("change", () => {
      const enabled = fabToggle.checked;
      document.body.classList.toggle("fab-enabled", enabled);
      localStorage.setItem("fabEnabled", enabled);
    });
    if (localStorage.getItem("fabEnabled") === "true") {
      fabToggle.checked = true;
      document.body.classList.add("fab-enabled");
    }
  }
});
function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const keys = el.dataset.i18n.split(".");
        let text = data;
        keys.forEach(k => text = text[k]);
        if (text) el.innerText = text;
      });
    })
    .catch(err => console.error("Language load error:", err));
}