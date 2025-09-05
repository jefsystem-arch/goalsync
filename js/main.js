// MAIN SPA CONTROLLER

// Load partial HTML into #pageContent
async function loadPage(page) {
  const container = document.getElementById("pageContent");
  if (!container) return;

  try {
    const response = await fetch(`partials/${page}.html`);
    if (!response.ok) throw new Error(`Missing partial: ${page}`);
    const html = await response.text();
    container.innerHTML = html;

    // Run page-specific init if exists
    const initFn = window[`init${capitalize(page)}`];
    if (typeof initFn === "function") initFn();
  } catch (err) {
    container.innerHTML = `<p style="color:red;">Error loading ${page}: ${err.message}</p>`;
  }
}

// Capitalize helper (for initSettings, initTasks, etc.)
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Setup navigation
function setupNavigation() {
  const links = document.querySelectorAll("[data-page]");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      // Highlight active link
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Load page
      loadPage(page);
    });
  });
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();

  // Load default page (Settings first for now)
  loadPage("settings");
});
