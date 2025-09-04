document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("assistantSend");
  const input = document.getElementById("assistantInput");
  const windowEl = document.getElementById("assistantWindow");

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("assistant-message", type);
    msg.textContent = text;
    windowEl.appendChild(msg);
    windowEl.scrollTop = windowEl.scrollHeight;
  }

  async function callAI(userMessage) {
    // Placeholder: simulate GPT response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("🤖 Smart AI reply (stubbed) to: " + userMessage);
      }, 800);
    });
  }

  if (sendBtn && input) {
    sendBtn.addEventListener("click", async () => {
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, "user");
      input.value = "";

      const aiResponse = await callAI(text);
      addMessage(aiResponse, "system");
    });
  }
});