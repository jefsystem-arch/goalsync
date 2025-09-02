// Navigation
function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
}

// Default page
document.addEventListener("DOMContentLoaded", () => {
  navigateTo("tasks");
  renderProgressCircles();
  loadChart();
});

// Task form handler
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("task-form")) {
    e.preventDefault();
    const title = e.target.querySelector("input[placeholder='Task title']").value;
    const time = e.target.querySelector("input[type='time']").value;
    if (title.trim()) {
      const list = document.querySelector(".task-list");
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox"> ${title} ${time ? "— " + time : ""}`;
      list.appendChild(li);
      e.target.reset();
    }
  }
});

// Goals progress circles
function renderProgressCircles() {
  document.querySelectorAll(".progress-circle").forEach(circle => {
    const progress = circle.dataset.progress;
    const deg = (progress / 100) * 360;
    circle.style.background = `conic-gradient(#2474f5 ${deg}deg, #e5e5ea ${deg}deg)`;
  });
}

// Dashboard chart
function loadChart() {
  const ctx = document.getElementById("activityChart");
  if (!ctx) return;
  if (typeof Chart === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = renderChart;
    document.body.appendChild(script);
  } else {
    renderChart();
  }
  function renderChart() {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "Tasks Completed",
          data: [3, 5, 2, 4, 6, 3, 1],
          backgroundColor: "#2474f5"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }
}

// Chat form handler
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("chat-form")) {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const text = input.value.trim();
    if (!text) return;
    const chatBox = document.querySelector(".chat-box");

    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    const aiMsg = document.createElement("div");
    aiMsg.className = "chat-msg ai";
    aiMsg.textContent = "Got it 👍 (this is a placeholder response)";
    chatBox.appendChild(aiMsg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
