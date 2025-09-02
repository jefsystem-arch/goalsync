// --------- Navigation Switching ---------
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

// --------- Tasks Page: Add New Task ---------
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

// --------- Dashboard: Chart.js Weekly Activity ---------
function loadChart() {
  const ctx = document.getElementById("activityChart");
  if (!ctx) return;

  // If Chart.js isn't already loaded, add it
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
          backgroundColor: "#007aff"
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
loadChart();

// --------- Goals Page: Progress Circles ---------
function renderProgressCircles() {
  document.querySelectorAll(".progress-circle").forEach(circle => {
    const progress = circle.dataset.progress;
    const deg = (progress / 100) * 360;
    circle.style.background = `conic-gradient(#007aff ${deg}deg, #e5e5ea ${deg}deg)`;
  });
}
renderProgressCircles();
