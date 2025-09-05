document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const navLinks = document.querySelectorAll("[data-page]");

  async function loadPage(page) {
    try {
      const response = await fetch(`partials/${page}.html`);
      const html = await response.text();
      content.innerHTML = html;
      switch (page) {
        case "tasks": if (typeof initTasks === "function") initTasks(); break;
        case "goals": if (typeof initGoals === "function") initGoals(); break;
        case "projects": if (typeof initProjects === "function") initProjects(); break;
        case "dashboard": if (typeof initDashboard === "function") initDashboard(); break;
        case "history": if (typeof initHistory === "function") initHistory(); break;
        case "invite": if (typeof initInvite === "function") initInvite(); break;
        case "assistant": if (typeof initAssistant === "function") initAssistant(); break;
        case "settings": if (typeof initSettings === "function") initSettings(); break;
        case "reminders": if (typeof initReminders === "function") initReminders(); break;
        case "team": if (typeof initTeam === "function") initTeam(); break;
        case "integrations": if (typeof initIntegrations === "function") initIntegrations(); break;
        case "notifications": if (typeof initNotifications === "function") initNotifications(); break;
        case "profile": if (typeof initProfile === "function") initProfile(); break;
        case "upgrade": if (typeof initUpgrade === "function") initUpgrade(); break;
      }
    } catch (err) {
      content.innerHTML = `<p>Error loading page: ${err.message}</p>`;
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      if (page) loadPage(page);
      navLinks.forEach(l => l.parentElement.classList.remove("active"));
      link.parentElement.classList.add("active");
    });
  });

  loadPage("tasks");

  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";
  body.classList.add(savedTheme);
  const savedColor = localStorage.getItem("themeColor") || "blue";
  body.setAttribute("data-theme", savedColor);

  window.toggleTheme = function() {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
  };

  window.setThemeColor = function(color) {
    body.setAttribute("data-theme", color);
    localStorage.setItem("themeColor", color);
  };

  window.toggleAssistantFAB = function() {
    const state = localStorage.getItem("assistantFAB") === "true";
    localStorage.setItem("assistantFAB", !state);
  };

  // Firebase placeholder (disabled for now)
});