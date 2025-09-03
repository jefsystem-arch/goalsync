document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".top-nav a");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active from all links and pages
      navLinks.forEach(l => l.classList.remove("active"));
      pages.forEach(p => p.classList.remove("active"));

      // Add active to clicked link and its target section
      link.classList.add("active");
      const targetId = link.getAttribute("href").substring(1);
      document.getElementById(targetId).classList.add("active");
    });
  });
});
