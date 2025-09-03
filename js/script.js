// Page switching
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const pages = document.querySelectorAll(".page");
  const underline = document.querySelector(".nav-underline");

  function moveUnderline(activeLink) {
    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = activeLink.parentElement.getBoundingClientRect();
    underline.style.width = `${linkRect.width}px`;
    underline.style.left = `${linkRect.left - parentRect.left}px`;
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove("active"));
      pages.forEach(p => p.classList.remove("active"));

      link.classList.add("active");
      document.getElementById(link.dataset.page).classList.add("active");
      moveUnderline(link);
    });
  });

  // Initialize underline
  const active = document.querySelector(".nav-links a.active");
  if (active) moveUnderline(active);
});
