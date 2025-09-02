// Navigation function
function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Update active state in top nav
  document.querySelectorAll(".top-nav li").forEach(li => {
    li.classList.remove("active");
  });
  const topItem = document.querySelector(`.top-nav li[onclick="navigateTo('${pageId}')"]`);
  if (topItem) {
    topItem.classList.add("active");
  }

  // Update active state in bottom nav (mobile)
  document.querySelectorAll(".bottom-nav li").forEach(li => {
    li.classList.remove("active");
  });
  const bottomItem = document.querySelector(`.bottom-nav li[onclick="navigateTo('${pageId}')"]`);
  if (bottomItem) {
    bottomItem.classList.add("active");
  }
}

// Default page
document.addEventListener("DOMContentLoaded", () => {
  navigateTo("tasks");
});

// Task form handler (sample functionality)
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("task-form")) {
    e.preventDefault();

    const title = e.target.querySelector("input[placeholder='Task title']").value;
    const time = e.target.querySelector("input[type='time']").value;

    if (title.trim()) {
      const list = document.querySelector(".task-list");
      const newItem = document.createElement("li");
      newItem.innerHTML = `<input type="checkbox"> ${title} ${time ? "— " + time : ""}`;
      list.appendChild(newItem);
      e.target.reset();
    }
  }
});

// Render progress circles for Goals page
function renderProgressCircles() {
  document.querySelectorAll(".progress-circle").forEach(circle => {
    const progress = circle.dataset.progress;
    const deg = (progress / 100) * 360;
    circle.style.background = `conic-gradient(#2474f5 ${deg}deg, #e5e5ea ${deg}deg)`;
  });
}

document.addEventListener("DOMContentLoaded", renderProgressCircles);

// Dashboard Weekly Activity Chart
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

document.addEventListener("DOMContentLoaded", loadChart);

// Chat form handler (simple demo)
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("chat-form")) {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const text = input.value.trim();
    if (!text) return;

    const chatBox = document.querySelector(".chat-box");

    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-msg user";
    userMsg.textContent = text;
    chatBox.appendChild(userMsg);

    // Fake AI response
    const aiMsg = document.createElement("div");
    aiMsg.className = "chat-msg ai";
    aiMsg.textContent = "Got it 👍 (this is a placeholder response)";
    chatBox.appendChild(aiMsg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

// Invite form (demo only)
document.addEventListener("submit", function (e) {
  if (e.target.classList.contains("invite-form")) {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    if (email.trim()) {
      const list = document.querySelector(".collaborators");
      const li = document.createElement("li");
      li.textContent = email + " (Pending)";
      list.appendChild(li);
      e.target.reset();
    }
  }
});

