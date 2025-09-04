document.addEventListener("DOMContentLoaded", () => {
  let projects = JSON.parse(localStorage.getItem("projects")) || {
    todo: [], inprogress: [], done: []
  };

  const taskForm = document.getElementById("projectTaskForm");

  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function renderProjects() {
    ["todo","inprogress","done"].forEach(status => {
      const container = document.getElementById(status + "Tasks");
      container.innerHTML = "";
      projects[status].forEach((title, idx) => {
        const task = document.createElement("div");
        task.classList.add("kanban-task");
        task.setAttribute("draggable","true");
        task.innerText = title;

        task.addEventListener("dragstart", e => {
          e.dataTransfer.setData("text/plain", JSON.stringify({title, status, idx}));
          task.classList.add("dragging");
        });

        task.addEventListener("dragend", () => task.classList.remove("dragging"));
        container.appendChild(task);
      });
    });
  }

  if (taskForm) {
    taskForm.addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("projectTaskTitle").value;
      projects.todo.push(title);
      saveProjects();
      renderProjects();
      taskForm.reset();
    });
  }

  document.querySelectorAll(".kanban-column").forEach(col => {
    col.addEventListener("dragover", e => e.preventDefault());
    col.addEventListener("drop", e => {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      projects[data.status].splice(data.idx, 1);
      const newStatus = col.getAttribute("data-status");
      projects[newStatus].push(data.title);
      saveProjects();
      renderProjects();
    });
  });

  renderProjects();
});