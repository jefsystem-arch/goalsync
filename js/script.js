document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const topNavLinks = document.querySelectorAll(".top-nav li");
  const bottomNavLinks = document.querySelectorAll(".bottom-nav li");

  // Create underline for top nav
  const underline = document.createElement("div");
  underline.classList.add("nav-underline");
  document.querySelector(".top-nav ul").appendChild(underline);

  /* ---------------- PAGE SWITCHING ---------------- */
  function showPage(pageId) {
    // Hide all pages
    pages.forEach((p) => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");

    // Update active nav state
    topNavLinks.forEach((li) => li.classList.remove("active"));
    bottomNavLinks.forEach((li) => li.classList.remove("active"));

    const topLink = document.querySelector(`.top-nav li[data-page="${pageId}"]`);
    const bottomLink = document.querySelector(`.bottom-nav li[data-page="${pageId}"]`);

    if (topLink) {
      topLink.classList.add("active");
      moveUnderline(topLink);
    }
    if (bottomLink) bottomLink.classList.add("active");
  }

  // Animate underline
  function moveUnderline(activeLink) {
    const rect = activeLink.getBoundingClientRect();
    const navRect = activeLink.parentElement.getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }

  // Nav click events
  topNavLinks.forEach((li) => li.addEventListener("click", () => showPage(li.dataset.page)));
  bottomNavLinks.forEach((li) => li.addEventListener("click", () => showPage(li.dataset.page)));

  // Default page
  showPage("tasks");

  /* ---------------- TASKS PAGE ---------------- */
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  if (taskForm) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("taskTitle").value.trim();
      const date = document.getElementById("taskDate").value;
      const time = document.getElementById("taskTime").value;

      if (!title) return;

      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox">
        <span>${title}${date ? " — " + date : ""}${time ? " " + time : ""}</span>
      `;
      taskList.appendChild(li);
      taskForm.reset();
    });
  }

  /* ---------------- SAMPLE DATA ---------------- */
  // Goals
  const goalsPage = document.getElementById("goals");
  if (goalsPage) {
    goalsPage.innerHTML = `
      <h2>Your Goals</h2>
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
        <div style="background:#f9f9f9;padding:1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06)">
          <strong>Fitness</strong><br><progress value="70" max="100"></progress> 70%
        </div>
        <div style="background:#f9f9f9;padding:1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06)">
          <strong>Career</strong><br><progress value="45" max="100"></progress> 45%
        </div>
        <div style="background:#f9f9f9;padding:1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06)">
          <strong>Learning</strong><br><progress value="90" max="100"></progress> 90%
        </div>
      </div>
    `;
  }

  // Projects
  const projectsPage = document.getElementById("projects");
  if (projectsPage) {
    projectsPage.innerHTML = `
      <h2>Your Projects</h2>
      <div style="display:flex;gap:1rem">
        <div style="flex:1;background:#f9f9f9;padding:1rem;border-radius:12px">
          <h4>TODO</h4>
          <p>Landing page design</p>
          <p>API integration</p>
        </div>
        <div style="flex:1;background:#f9f9f9;padding:1rem;border-radius:12px">
          <h4>In Progress</h4>
          <p>Mobile app prototype</p>
        </div>
        <div style="flex:1;background:#f9f9f9;padding:1rem;border-radius:12px">
          <h4>Done</h4>
          <p>Project kickoff</p>
        </div>
      </div>
    `;
  }

  // Chat
  const chatPage = document.getElementById("chat");
  if (chatPage) {
    chatPage.innerHTML = `
      <h2>Chat</h2>
      <div style="background:#f8f8f8;padding:1rem;border-radius:12px;height:250px;overflow-y:auto;margin-bottom:1rem">
        <div><strong>AI:</strong> Welcome back Jeff! Ready to achieve your goals today?</div>
        <div style="text-align:right"><strong>You:</strong> Yes, let’s do this!</div>
      </div>
      <form style="display:flex;gap:0.5rem">
        <input type="text" placeholder="Type your message..." style="flex:1;padding:0.7rem;border-radius:12px;border:1px solid #ddd">
        <button style="background:var(--blue);color:white;border:none;border-radius:12px;padding:0.7rem 1rem;cursor:pointer">Send</button>
      </form>
    `;
  }

  // Dashboard
  const dashboardPage = document.getElementById("dashboard");
  if (dashboardPage) {
    dashboardPage.innerHTML = `
      <h2>Dashboard</h2>
      <div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));margin-bottom:1rem">
        <div style="background:#f9f9f9;padding:1rem;border-radius:12px;text-align:center">Tasks Completed<br><strong>24</strong></div>
        <div style="background:#f9f9f9;padding:1rem;border-radius:12px;text-align:center">Goals Progress<br><strong>65%</strong></div>
        <div style="background:#f9f9f9;padding:1rem;border-radius:12px;text-align:center">Active Projects<br><strong>3</strong></div>
      </div>
    `;
  }

  // Invite
  const invitePage = document.getElementById("invite");
  if (invitePage) {
    invitePage.innerHTML = `
      <h2>Invite Team Members</h2>
      <form style="margin-bottom:1rem">
        <input type="email" placeholder="Enter email" style="padding:0.7rem;border-radius:12px;border:1px solid #ddd">
        <button style="margin-left:0.5rem;background:var(--blue);color:white;border:none;border-radius:12px;padding:0.7rem 1rem;cursor:pointer">Invite</button>
      </form>
      <ul style="list-style:none;padding:0">
        <li>alice@example.com (Pending)</li>
        <li>bob@example.com (Accepted)</li>
      </ul>
    `;
  }

  // History
  const historyPage = document.getElementById("history");
  if (historyPage) {
    historyPage.innerHTML = `
      <h2>History</h2>
      <div style="display:flex;flex-direction:column;gap:0.6rem">
        <div style="background:#f9f9f9;padding:0.8rem;border-radius:12px">Completed: Respond to emails — 9:00 AM</div>
        <div style="background:#f9f9f9;padding:0.8rem;border-radius:12px">Completed: Read 20 pages — Yesterday</div>
        <div style="background:#f9f9f9;padding:0.8rem;border-radius:12px">Goal Achieved: Weekly Exercise Streak — Last week</div>
      </div>
    `;
  }

  // Assistant
  const assistantPage = document.getElementById("assistant");
  if (assistantPage) {
    assistantPage.innerHTML = `
      <h2>Assistant</h2>
      <div style="background:#f8f8f8;padding:1rem;border-radius:12px;height:250px;overflow-y:auto;margin-bottom:1rem">
        <div><strong>AI:</strong> Your top priority today is the Project Presentation at 10:30 AM.</div>
        <div style="text-align:right"><strong>You:</strong> Can you also remind me to call Sarah at 3 PM?</div>
        <div><strong>AI:</strong> Got it! Added ‘Call Sarah’ to your tasks.</div>
      </div>
      <form style="display:flex;gap:0.5rem">
        <input type="text" placeholder="Ask GoalSync Assistant..." style="flex:1;padding:0.7rem;border-radius:12px;border:1px solid #ddd">
        <button style="background:var(--blue);color:white;border:none;border-radius:12px;padding:0.7rem 1rem;cursor:pointer">Ask</button>
      </form>
    `;
  }

  // Settings
  const settingsPage = document.getElementById("settings");
  if (settingsPage) {
    settingsPage.innerHTML = `
      <h2>Settings</h2>
      <label><input type="checkbox"> Enable Dark Mode</label><br>
      <label><input type="checkbox"> Notifications</label><br>
      <label>Theme Color:
        <input type="color" value="#2979ff">
      </label><br>
      <label>Language:
        <select>
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </label>
    `;
  }
});
