function initDashboard() {
  const canvas = document.getElementById("dashboardChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Tasks Completed',
        data: [3, 2, 4, 5, 1, 0, 2],
        backgroundColor: '#007aff'
      }]
    }
  });
}