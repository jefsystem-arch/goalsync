function initNotifications() {
  const list = document.getElementById("notificationsList");
  if (!list) return;
  list.innerHTML = "<li>Notification: Task due today 🔔</li>";
}