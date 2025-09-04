document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".connect-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const service = btn.dataset.service;
      window.showNotification(`🌐 Connecting to ${service} (stub)...`);
      // Later: trigger OAuth / API integration
    });
  });
});