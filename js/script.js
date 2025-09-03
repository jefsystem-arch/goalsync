// ===== Task Management =====
const taskForm = document.querySelector(".task-form");
const taskList = document.querySelector(".task-list");

if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = taskForm.querySelector('input[name="title"]').value.trim();
    if (!title) return;

    const li = document.createElement("div");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = title;

    li.appendChild(checkbox);
    li.appendChild(span);

    taskList.appendChild(li);
    taskForm.reset();
  });
}

// ===== Navigation Switching =====
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll(".page-section");

function showSection(id) {
  sections.forEach((section) => {
    section.style.display = section.id === id ? "block" : "none";
  });

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Default page: Tasks
if (sections.length > 0) {
  showSection("tasks");
}

// Handle clicks
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("href").substring(1);
    showSection(target);
  });
});
