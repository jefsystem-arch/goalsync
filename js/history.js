document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("historyTimeline");
  let historyItems = JSON.parse(localStorage.getItem("history")) || [];

  function saveHistory() {
    localStorage.setItem("history", JSON.stringify(historyItems));
  }

  function renderHistory() {
    timeline.innerHTML = "";
    historyItems.forEach(item => {
      const entry = document.createElement("div");
      entry.classList.add("timeline-entry");
      entry.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>${item.type === "goal" ? "Goal Achieved 🎯" : "Task Completed ✅"}</h3>
          <p>${item.text} — ${item.date}</p>
        </div>
      `;
      timeline.appendChild(entry);
    });
  }

  window.addToHistory = function(type, text) {
    historyItems.push({ type, text, date: new Date().toLocaleDateString() });
    saveHistory();
    renderHistory();
  };

  renderHistory();
});