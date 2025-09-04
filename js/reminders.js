document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("reminderList");
  const form = document.getElementById("reminderForm");
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  function saveReminders() {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }

  function renderReminders() {
    list.innerHTML = "";
    if (reminders.length === 0) {
      list.innerHTML = "<li>No reminders yet.</li>";
      return;
    }
    reminders.forEach((r, idx) => {
      const li = document.createElement("li");
      li.textContent = `${r.text} — ${new Date(r.time).toLocaleString()}`;
      list.appendChild(li);
    });
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const text = document.getElementById("reminderText").value;
      const time = document.getElementById("reminderTime").value;
      reminders.push({ text, time });
      saveReminders();
      renderReminders();
      form.reset();
      window.showNotification(`⏰ Reminder set: ${text}`);
    });
  }

  setInterval(() => {
    const now = new Date().getTime();
    reminders.forEach((r, idx) => {
      if (new Date(r.time).getTime() <= now) {
        window.showNotification(`🔔 ${r.text}`);
        reminders.splice(idx, 1);
        saveReminders();
        renderReminders();
      }
    });
  }, 30000);

  window.suggestSmartReminder = function(task) {
    return `⏰ Reminder: Work on "${task}" tomorrow at 9:00 AM`;
  };

  renderReminders();
});