document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("#nav li");
  const content = document.getElementById("content");
  const underline = document.getElementById("nav-underline");

  // Default load = Tasks
  loadPage("tasks");

  // Restore saved theme + mode
  applySavedPreferences();

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("data-page");
      loadPage(page);
      setActiveNav(item);
    });
  });

  function setActiveNav(activeItem) {
    navItems.forEach((item) => item.classList.remove("active"));
    activeItem.classList.add("active");

    // Animate underline
    const { offsetLeft, offsetWidth } = activeItem;
    underline.style.width = `${offsetWidth}px`;
    underline.style.left = `${offsetLeft}px`;
  }

  function loadPage(page) {
    fetch(`partials/${page}.html`)
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;

        // Call JS for each page if needed
        if (window[`${page}Init`]) {
          window[`${page}Init`]();
        }

        // Restore theme after switching page
        applySavedPreferences();
      })
      .catch((err) => {
        content.innerHTML = `<p>Error loading page: ${page}</p>`;
        console.error(err);
      });

    // Set underline to active nav item
    const activeItem = document.querySelector(`#nav li[data-page="${page}"]`);
    if (activeItem) setActiveNav(activeItem);
  }

  window.loadPage = loadPage;
});
