document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("notificationList");

  const notifications = [
    { text: "✅ You completed a task!", date: new Date().toLocaleTimeString() },
    { text: "🎯 You achieved a goal milestone!", date: new Date().toLocaleTimeString() }
  ];

  if (list) {
    list.innerHTML = "";
    notifications.forEach(n => {
      const li = document.createElement("li");
      li.textContent = `${n.text} (${n.date})`;
      list.appendChild(li);
    });
  }

  window.showNotification = function (msg) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };
});