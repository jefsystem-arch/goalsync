import { db } from "./firebase.js";
import { collection, setDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Save data to Firestore
export async function saveData(collectionName, data) {
  try {
    await setDoc(doc(db, collectionName, "user1"), { data });
    console.log("✅ Saved to cloud:", collectionName);
  } catch (e) {
    console.error("❌ Error saving:", e);
  }
}

// Load data from Firestore
export async function loadData(collectionName) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    let results = [];
    snapshot.forEach(doc => results.push(doc.data()));
    console.log("✅ Loaded from cloud:", results);
    return results;
  } catch (e) {
    console.error("❌ Error loading:", e);
    return [];
  }
}