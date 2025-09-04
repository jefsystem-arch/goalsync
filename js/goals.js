document.addEventListener("DOMContentLoaded", () => {
  const goalForm = document.getElementById("goalForm");
  const goalsList = document.getElementById("goalsList");
  let goals = JSON.parse(localStorage.getItem("goals")) || [];

  function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
  }

  function renderGoals() {
    goalsList.innerHTML = "";
    goals.forEach((g, idx) => {
      const card = document.createElement("div");
      card.classList.add("goal-card");
      card.innerHTML = `
        <div class="goal-title">${g.title}</div>
        <div class="goal-deadline">Deadline: ${g.deadline}</div>
        <div class="goal-category">Category: ${g.category}</div>
        <div class="progress-container"><div class="progress-bar" style="width:30%"></div></div>
        <ul class="milestones">${(g.milestones||[]).map(m => `<li>${m}</li>`).join("")}</ul>
        <button class="ai-suggest-btn">Suggest Milestones (AI)</button>
      `;
      card.querySelector(".ai-suggest-btn").addEventListener("click", async () => {
        const ms = ["Define steps", "Break into tasks", "Track weekly"];
        g.milestones = ms;
        saveGoals();
        renderGoals();
      });
      goalsList.appendChild(card);
    });
  }

  if (goalForm) {
    goalForm.addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("goalTitle").value;
      const deadline = document.getElementById("goalDeadline").value;
      const category = document.getElementById("goalCategory").value;
      goals.push({ title, deadline, category, milestones: [] });
      saveGoals();
      renderGoals();
      if (window.addToHistory) {
        window.addToHistory("goal", title);
      }
      goalForm.reset();
    });
  }

  renderGoals();
});