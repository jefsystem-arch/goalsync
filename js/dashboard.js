import Chart from "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const tasksCompleted = [5, 8, 6, 10, 7, 12, 9];
  const goalsProgress = [20, 40, 60, 80];

  new Chart(document.getElementById("tasksChart"), {
    type: "line",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Tasks Completed",
        data: tasksCompleted,
        fill: true,
        borderColor: "#007aff",
        backgroundColor: "rgba(0,122,255,0.1)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });

  new Chart(document.getElementById("goalsChart"), {
    type: "doughnut",
    data: {
      labels: ["Done","Remaining"],
      datasets: [{
        data: [goalsProgress[2], 100 - goalsProgress[2]],
        backgroundColor: ["#34c759","#e5e5ea"]
      }]
    },
    options: { responsive: true, cutout: "70%" }
  });

  const insightsBox = document.getElementById("aiInsights");
  setTimeout(() => {
    insightsBox.innerHTML = `
      <p>✅ You’ve been most productive on <b>Thursday</b>.</p>
      <p>🎯 Goal completion is trending at <b>60%</b>.</p>
      <p>💡 AI Suggestion: Focus on wrapping smaller goals first for momentum.</p>
    `;
  }, 1000);
});