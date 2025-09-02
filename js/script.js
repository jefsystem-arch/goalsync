// Handle tab navigation
const sections = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("nav button");

function showPage(pageId) {
  sections.forEach(section => {
    section.classList.remove("active");
    if (section.id === pageId) section.classList.add("active");
  });

  navButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.page === pageId) btn.classList.add("active");
  });
}

// Default page
showPage("tasks");

// Event listeners
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.page;
    showPage(target);
  });
});

// Handle task form submission (for demo)
const taskForm = document.querySelector(".task-form");
const taskList = document.querySelector(".task-list");

if (taskForm) {
  taskForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = taskForm.querySelector("input[type='text']").value;
    if (title.trim() !== "") {
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox"> ${title}`;
      taskList.appendChild(li);
      taskForm.reset();
    }
  });
}
