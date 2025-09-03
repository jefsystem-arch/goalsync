// Load default page
document.addEventListener("DOMContentLoaded", () => {
  loadPage("tasks"); // default
  initTheme();
});

// Handle navigation
document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    loadPage(page);
    setActiveNav(link);
  });
});

// Load partial into main content
function loadPage(page) {
  fetch(`partials/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      if (page === "settings") initSettings();
    });
}

// Highlight active nav
function setActiveNav(link) {
  document.querySelectorAll(".top-nav li, .bottom-nav li").forEach(li => li.classList.remove("active"));
  link.parentElement.classList.add("active");
}

// Theme persistence
function initTheme() {
  if (localStorage.getItem("themeMode") === "dark") {
    document.body.classList.add("dark");
  }
  const savedTheme = localStorage.getItem("themeColor");
  if (savedTheme) document.body.classList.add("theme-" + savedTheme);
}

// Settings page logic
function initSettings() {
  const darkToggle = document.getElementById("darkModeToggle");
  if (darkToggle) {
    darkToggle.checked = document.body.classList.contains("dark");
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark", darkToggle.checked);
      localStorage.setItem("themeMode", darkToggle.checked ? "dark" : "light");
    });
  }

  document.querySelectorAll(".swatch").forEach(swatch => {
    swatch.addEventListener("click", function () {
      document.body.classList.remove("theme-blue","theme-green","theme-red","theme-purple","theme-orange","theme-teal");
      document.body.classList.add("theme-" + this.dataset.color);
      localStorage.setItem("themeColor", this.dataset.color);
      document.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = localStorage.getItem("language") || "en";
    langSelect.addEventListener("change", () => {
      localStorage.setItem("language", langSelect.value);
      alert("Language set to " + langSelect.options[langSelect.selectedIndex].text + " (translations coming soon)");
    });
  }

  const fabToggle = document.getElementById("assistantToggle");
  if (fabToggle) {
    fabToggle.checked = localStorage.getItem("assistantFAB") === "on";
    fabToggle.addEventListener("change", () => {
      localStorage.setItem("assistantFAB", fabToggle.checked ? "on" : "off");
      const fab = document.querySelector(".assistant-fab");
      if (fab) fab.style.display = fabToggle.checked ? "block" : "none";
    });
  }
}
