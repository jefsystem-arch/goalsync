document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".top-nav li");
  const pages = document.querySelectorAll(".page");
  const underline = document.querySelector(".nav-underline");

  function moveUnderline(target) {
    const rect = target.getBoundingClientRect();
    const navRect = target.parentElement.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
  }

  // Initialize underline under active item
  const activeItem = document.querySelector(".top-nav li.active");
  if (activeItem) moveUnderline(activeItem);

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Switch active class
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Show the correct page
      pages.forEach(page => page.classList.remove("active"));
      document.getElementById(item.dataset.page).classList.add("active");

      // Move underline
      moveUnderline(item);
    });
  });

  // Recalculate on resize
  window.addEventListener("resize", () => {
    const currentActive = document.querySelector(".top-nav li.active");
    if (currentActive) moveUnderline(currentActive);
  });
});
