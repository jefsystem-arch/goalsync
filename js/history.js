function initHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;
  list.innerHTML = "<li>Completed Task ✅</li>";
}