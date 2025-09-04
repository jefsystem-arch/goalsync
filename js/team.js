document.addEventListener("DOMContentLoaded", () => {
  const teamList = document.getElementById("teamList");
  const sharedProjectsList = document.getElementById("sharedProjectsList");
  const inviteForm = document.getElementById("teamInviteForm");

  let teamMembers = JSON.parse(localStorage.getItem("teamMembers")) || ["You (Owner)"];
  let sharedProjects = JSON.parse(localStorage.getItem("sharedProjects")) || [];

  function saveData() {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    localStorage.setItem("sharedProjects", JSON.stringify(sharedProjects));
  }

  function renderTeam() {
    teamList.innerHTML = "";
    teamMembers.forEach(m => {
      const li = document.createElement("li");
      li.textContent = m;
      teamList.appendChild(li);
    });
  }

  function renderProjects() {
    sharedProjectsList.innerHTML = "";
    if (sharedProjects.length === 0) {
      sharedProjectsList.innerHTML = "<li>No shared projects yet.</li>";
      return;
    }
    sharedProjects.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p;
      sharedProjectsList.appendChild(li);
    });
  }

  if (inviteForm) {
    inviteForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("teamInviteEmail").value;
      teamMembers.push(email + " (Invited)");
      saveData();
      renderTeam();
      inviteForm.reset();
      alert(`Invite sent to ${email} 🚀`);
    });
  }

  renderTeam();
  renderProjects();
});