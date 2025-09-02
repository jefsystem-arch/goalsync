import { db, auth } from "./firebase-config.js";
import { 
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const goalsCol = collection(db, "goals");

// --- Add Goal ---
export async function addGoal(goal) {
  await addDoc(goalsCol, {
    ...goal,
    ownerId: auth.currentUser.uid   // ✅
  });
}

// --- Get Goals ---
export async function getGoals() {
  const q = query(goalsCol, where("ownerId", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// --- Update Goal ---
export async function updateGoal(id, updatedFields) {
  await updateDoc(doc(db, "goals", id), updatedFields);
}

// --- Delete Goal ---
export async function deleteGoal(id) {
  await deleteDoc(doc(db, "goals", id));
}
