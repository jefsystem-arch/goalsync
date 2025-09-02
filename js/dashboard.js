import { db, auth } from "./firebase-config.js";
import { 
  collection, getDocs, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Collections
const tasksCol = collection(db, "tasks");
const goalsCol = collection(db, "goals");
const projectsCol = collection(db, "projects");

// --- Fetch Summary for Current User ---
async function fetchSummary() {
  if (!auth.currentUser) {
    console.warn("⚠️ No user logged in yet.");
    return;
  }

  const uid = auth.currentUser.uid;

  // Tasks
  const tasksQ = query(tasksCol, where("ownerId", "==", uid));
  const tasksSnap = await getDocs(tasksQ);
  const tasks = tasksSnap.docs.map(d => d.data());

  // Goals
  const goalsQ = query(goalsCol, where("ownerId", "==", uid));
  const goalsSnap = await getDocs(goalsQ);
  const goals = goalsSnap.docs.map(d => d.data());

  // Projects
  const projectsQ = query(projectsCol, where("ownerId", "==", uid));
  const projectsSnap = await getDocs(projectsQ);
  const projects = projectsSnap.docs.map(d => d.data());

  // Update UI
  document.getElementById("summaryTasks").textContent = `${tasks.filter(t => t.completed).length}/${tasks.length}`;
  document.getElementById("summaryGoals").textContent = `${Math.round(goals.reduce((sum, g) => sum + (g.progress || 0), 0) / (goals.length || 1))}%`;
  document.getElementById("summaryProjects").textContent = `${Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / (projects.length || 1))}%`;

  // Example chart: tasks completed vs pending
  const ctx = document.getElementById("tasksChart");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Pending"],
        datasets: [{
          data: [tasks.filter(t => t.completed).length, tasks.filter(t => !t.completed).length],
          backgroundColor: ["#28a745", "#dc3545"]
        }]
      }
    });
  }
}

// Run when user logs in
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
onAuthStateChanged(auth, (user) => {
  if (user) fetchSummary();
});
