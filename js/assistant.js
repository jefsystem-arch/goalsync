import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tasksCol = collection(db, "tasks");
const goalsCol = collection(db, "goals");
const projectsCol = collection(db, "projects");

const chatWindow = document.getElementById("chatWindow");
const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `chat-message ${sender}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function fetchTasks() {
  const snap = await getDocs(tasksCol);
  return snap.docs.map(d => d.data());
}
async function fetchGoals() {
  const snap = await getDocs(goalsCol);
  return snap.docs.map(d => d.data());
}
async function fetchProjects() {
  const snap = await getDocs(projectsCol);
  return snap.docs.map(d => d.data());
}

async function getAssistantReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("tasks")) {
    const tasks = await fetchTasks();
    return `✅ You have ${tasks.length} tasks.`;
  }
  if (msg.includes("goals")) {
    const goals = await fetchGoals();
    return `🎯 You have ${goals.length} goals.`;
  }
  if (msg.includes("projects")) {
    const projects = await fetchProjects();
    return `📁 You have ${projects.length} projects.`;
  }
  return "🤔 I'm still learning!";
}

assistantForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = assistantInput.value.trim();
  if (!userMsg) return;
  appendMessage("user", userMsg);
  const reply = await getAssistantReply(userMsg);
  setTimeout(() => appendMessage("assistant", reply), 500);
  assistantInput.value = "";
});
