document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const topNavButtons = document.querySelectorAll(".top-nav button");
  const bottomNavButtons = document.querySelectorAll(".bottom-nav button");
  const navButtons = [...topNavButtons, ...bottomNavButtons];
  const navBar = document.querySelector(".top-nav");

  // Default to tasks
  navigateTo("tasks");

  // Attach click handlers
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const pageId = button.dataset.page;
      navigateTo(pageId);
    });
  });

  function navigateTo(pageId) {
    // Hide all pages
    pages.forEach(p => p.classList.remove("active"));
    // Show selected page
    const activePage = document.getElementById(pageId);
    if (activePage) activePage.classList.add("active");

    // Update nav button states
    navButtons.forEach(btn => btn.classList.remove("active"));
    const activeButtons = navButtons.filter(btn => btn.dataset.page === pageId);
    activeButtons.forEach(btn => btn.classList.add("active"));

    // Update underline indicator (desktop only)
    const activeTop = document.querySelector(`.top-nav button[data-page="${pageId}"]`);
    if (activeTop && navBar) {
      const rect = activeTop.getBoundingClientRect();
      const navRect = navBar.getBoundingClientRect();
      const underlineLeft = rect.left - navRect.left;
      const underlineWidth = rect.width;
      navBar.style.setProperty("--underline-left", underlineLeft + "px");
      navBar.style.setProperty("--underline-width", underlineWidth + "px");
    }
  }
});
