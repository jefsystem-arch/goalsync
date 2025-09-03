document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll("[data-page]");
  const navBar = document.querySelector(".top-nav");
  const taskList = document.querySelector(".task-list");
  const goalsGrid = document.querySelector(".goals-grid");
  const projectsBoard = document.querySelector(".projects-board");
  const chatWindow = document.querySelector(".chat-window");
  const dashboardCards = document.querySelector(".dashboard-cards");
  const inviteList = document.querySelector(".invite-list");
  const historyList = document.querySelector(".history-list");
  const assistantWindow = document.querySelector(".assistant-window");

  // --- Sample Data ---
  const sampleTasks = [
    { title: "Work on presentation", time: "10:30 AM", done: true },
    { title: "Respond to emails", time: "9:00 AM", done: true },
    { title: "Exercise at gym", time: "5:30 PM", done: false }
  ];

  const sampleGoals = [
    { name: "Fitness", progress: 70 },
    { name: "Career", progress: 45 },
    { name: "Learning", progress: 90 }
  ];

  const sampleProjects = {
    todo: ["Landing page design", "API integration"],
    inprogress: ["Mobile app prototype"],
    done: ["Project kickoff"]
  };

  const sampleChat = [
    { sender: "AI", text: "Welcome back Jeff! Ready to achieve your goals today?" },
    { sender: "You", text: "Yes, let’s do this!" }
  ];

  const sampleDashboard = [
    { title: "Tasks Completed", value: 24 },
    { title: "Goals Progress", value: "65%" },
    { title: "Active Projects", value: 3 }
  ];

  const sampleInvites = ["alice@example.com (Pending)", "bob@example.com (Accepted)"];

  const sampleHistory = [
    "Completed: Respond to emails — 9:00 AM",
    "Completed: Read 20 pages — Yesterday",
    "Goal Achieved: Weekly Exercise Streak — Last week"
  ];

  const sampleAssistant = [
    { sender: "AI", text: "Your top priority today is the Project Presentation at 10:30 AM." },
    { sender: "You", text: "Can you also remind me to call Sarah at 3 PM?" },
    { sender: "AI", text: "Got it! Added ‘Call Sarah’ to your tasks." }
  ];

  // --- Populate Pages ---
  // Tasks
  taskList.innerHTML = "";
  sampleTasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" ${t.done ? "checked" : ""}> ${t.title} — ${t.time}`;
    taskList.appendChild(li);
  });

  // Goals
  goalsGrid.innerHTML = "";
  sampleGoals.forEach(g => {
    const div = document.createElement("div");
    div.style.background = "#f7f7f7";
    div.style.padding = "1rem";
    div.style.borderRadius = "6px";
    div.innerHTML = `<strong>${g.name}</strong><br>
      <progress value="${g.progress}" max="100"></progress> ${g.progress}%`;
    goalsGrid.appendChild(div);
  });

  // Projects
  projectsBoard.innerHTML = "";
  ["todo", "inprogress", "done"].forEach(col => {
    const div = document.createElement("div");
    div.style.flex = "1";
    div.style.background = "#f8f8f8";
    div.style.padding = "1rem";
    div.style.borderRadius = "6px";
    div.innerHTML = `<h4>${col.toUpperCase()}</h4>`;
    sampleProjects[col].forEach(p => {
      const task = document.createElement("p");
      task.textContent = p;
      div.appendChild(task);
    });
    projectsBoard.appendChild(div);
  });

  // Chat
  chatWindow.innerHTML = "";
  sampleChat.forEach(m => {
    const msg = document.createElement("div");
    msg.style.margin = "0.5rem 0";
    msg.style.textAlign = m.sender === "You" ? "right" : "left";
    msg.innerHTML = `<span><strong>${m.sender}:</strong> ${m.text}</span>`;
    chatWindow.appendChild(msg);
  });

  // Dashboard
  dashboardCards.innerHTML = "";
  sampleDashboard.forEach(d => {
    const card = document.createElement("div");
    card.innerHTML = `<h3>${d.title}</h3><p>${d.value}</p>`;
    dashboardCards.appendChild(card);
  });

  // Invite
  inviteList.innerHTML = "";
  sampleInvites.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    inviteList.appendChild(li);
  });

  // History
  historyList.innerHTML = "";
  sampleHistory.forEach(h => {
    const div = document.createElement("div");
    div.textContent = h;
    historyList.appendChild(div);
  });

  // Assistant
  assistantWindow.innerHTML = "";
  sampleAssistant.forEach(m => {
    const msg = document.createElement("div");
    msg.style.margin = "0.5rem 0";
    msg.style.textAlign = m.sender === "You" ? "right" : "left";
    msg.innerHTML = `<span><strong>${m.sender}:</strong> ${m.text}</span>`;
    assistantWindow.appendChild(msg);
  });

  // --- Navigation Logic ---
  function navigateTo(pageId) {
    // Hide all
    pages.forEach(p => p.classList.remove("active"));
    // Show selected
    const activePage = document.getElementById(pageId);
    if (activePage) activePage.classList.add("active");

    // Update nav button states
    navButtons.forEach(btn => btn.classList.remove("active"));
    const activeButtons = [...navButtons].filter(btn => btn.dataset.page === pageId);
    activeButtons.forEach(btn => btn.classList.add("active"));

    // Animate underline (desktop only)
    const activeTop = document.querySelector(`.top-nav button[data-page="${pageId}"]`);
    if (activeTop && navBar) {
      const rect = activeTop.getBoundingClientRect();
      const navRect = navBar.getBoundingClientRect();
      const underlineLeft = rect.left - navRect.left;
      const underlineWidth = rect.width;
      navBar.style.setProperty("--underline-left", underlineLeft + "px");
      navBar.style.setProperty("--underline-width", underlineWidth + "px");
    }
  }

  // Attach click handlers
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const pageId = button.dataset.page;
      navigateTo(pageId);
    });
  });

  // Default page
  navigateTo("tasks");

  // --- Settings Page Demo ---
  const darkModeToggle = document.querySelector('#settings input[type="checkbox"]');
  const notificationToggle = document.querySelectorAll('#settings input[type="checkbox"]')[1];
  const colorPicker = document.querySelector('#settings input[type="color"]');
  const languageSelect = document.querySelector('#settings select');

  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkModeToggle.checked);
    });
  }

  if (notificationToggle) {
    notificationToggle.addEventListener("change", () => {
      alert(notificationToggle.checked ? "Notifications Enabled" : "Notifications Disabled");
    });
  }

  if (colorPicker) {
    colorPicker.addEventListener("input", () => {
      document.documentElement.style.setProperty("--accent-color", colorPicker.value);
      navBar.style.setProperty("color", colorPicker.value);
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      const tagline = document.querySelector(".tagline");
      if (languageSelect.value === "Spanish") tagline.textContent = "Planifica inteligentemente. Mantente en camino. Logra más.";
      if (languageSelect.value === "French") tagline.textContent = "Planifiez intelligemment. Restez sur la bonne voie. Réalisez plus.";
      if (languageSelect.value === "English") tagline.textContent = "Plan smart. Stay on track. Achieve more.";
    });
  }
});
