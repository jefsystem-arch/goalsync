document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.querySelector(".page-content");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.classList.add("task-card");
      card.innerHTML = `
        <div class="task-content"><p>${task}</p></div>
        <button class="task-complete-btn">✔</button>
      `;
      card.querySelector(".task-complete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        if (window.addToHistory) {
          window.addToHistory("task", task);
        }
        renderTasks();
      });
      taskList.appendChild(card);
    });
  }

  renderTasks();
});