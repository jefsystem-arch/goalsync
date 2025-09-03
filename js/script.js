document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".top-nav a");
  const pages = document.querySelectorAll(".page");
  const underline = document.querySelector(".nav-underline");

  // Handle nav click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // Deactivate all
      navLinks.forEach(l => l.classList.remove("active"));
      pages.forEach(p => p.classList.remove("active"));

      // Activate current
      link.classList.add("active");
      const pageId = link.getAttribute("data-page");
      document.getElementById(pageId).classList.add("active");

      // Move underline
      const linkRect = link.getBoundingClientRect();
      const navRect = link.parentElement.parentElement.getBoundingClientRect();
      underline.style.width = `${linkRect.width}px`;
      underline.style.left = `${linkRect.left - navRect.left}px`;
    });
  });

  // Init underline position on load
  const activeLink = document.querySelector(".top-nav a.active");
  if (activeLink) {
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = activeLink.parentElement.parentElement.getBoundingClientRect();
    underline.style.width = `${linkRect.width}px`;
    underline.style.left = `${linkRect.left - navRect.left}px`;
  }
});
