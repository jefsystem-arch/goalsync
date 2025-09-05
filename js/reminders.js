function initReminders() {
  const list = document.getElementById("remindersList");
  if (!list) return;
  list.innerHTML = "<li>Reminder: Meeting at 10am ⏰</li>";
}