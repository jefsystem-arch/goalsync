import { db, auth } from "./firebase-config.js";
import { 
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tasksCol = collection(db, "tasks");

// --- Create Task ---
export async function addTask(task) {
  try {
    await addDoc(tasksCol, {
      ...task,
      ownerId: auth.currentUser.uid   // ✅ Only owner can see/edit
    });
    console.log("✅ Task added");
  } catch (err) {
    console.error("❌ Error adding task:", err);
  }
}

// --- Read Tasks ---
export async function getTasks() {
  const q = query(tasksCol, where("ownerId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// --- Update Task ---
export async function updateTask(id, updatedFields) {
  try {
    await updateDoc(doc(db, "tasks", id), updatedFields);
    console.log("✅ Task updated");
  } catch (err) {
    console.error("❌ Error updating task:", err);
  }
}

// --- Delete Task ---
export async function deleteTask(id) {
  try {
    await deleteDoc(doc(db, "tasks", id));
    console.log("✅ Task deleted");
  } catch (err) {
    console.error("❌ Error deleting task:", err);
  }
}
