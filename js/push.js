import { getMessaging, getToken, onMessage } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { app } from "./firebase.js";

const messaging = getMessaging(app);

export async function initPush() {
  try {
    const token = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
    console.log("✅ Push token:", token);
  } catch (err) {
    console.error("❌ Push init failed:", err);
  }
}

onMessage(messaging, (payload) => {
  console.log("Push received:", payload);
  if (window.showNotification) {
    window.showNotification("🔔 " + payload.notification.title);
  }
});