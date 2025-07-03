const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const chat = document.getElementById("chatContainer");
const userSwitcher = document.getElementById("userSwitcher");
const darkToggle = document.getElementById("darkToggle");
const typingIndicator = document.getElementById("typingIndicator");

function addMessage(content, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = `
    ${content}
    <div class="timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
  `;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  const user = userSwitcher.value;
  addMessage(message, user === "You" ? "you" : "bot");

  input.value = "";

  // Show typing indicator
  typingIndicator.style.display = "block";
  setTimeout(() => {
    typingIndicator.style.display = "none";
    addMessage("This is a dummy reply.", user === "You" ? "bot" : "you");
  }, 1000);
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
