import { db, auth } from "./firebase-config.js";
import { 
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const projectsCol = collection(db, "projects");

// --- Add Project ---
export async function addProject(project) {
  await addDoc(projectsCol, {
    ...project,
    ownerId: auth.currentUser.uid   // ✅
  });
}

// --- Get Projects ---
export async function getProjects() {
  const q = query(projectsCol, where("ownerId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// --- Update Project ---
export async function updateProject(id, updatedFields) {
  await updateDoc(doc(db, "projects", id), updatedFields);
}

// --- Delete Project ---
export async function deleteProject(id) {
  await deleteDoc(doc(db, "projects", id));
}
