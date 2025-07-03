const input = document.getElementById("markdownInput");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const darkToggle = document.getElementById("darkToggle");

// Load from localStorage
window.addEventListener("load", () => {
  const saved = localStorage.getItem("markdownContent");
  if (saved) {
    input.value = saved;
    preview.innerHTML = marked.parse(saved);
  }
});

// Update preview & localStorage
input.addEventListener("input", () => {
  const content = input.value;
  preview.innerHTML = marked.parse(content);
  localStorage.setItem("markdownContent", content);
});

// Clear content
clearBtn.addEventListener("click", () => {
  input.value = "";
  preview.innerHTML = "";
  localStorage.removeItem("markdownContent");
});

// Download markdown
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([input.value], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "note.md";
  a.click();
});

// Copy to clipboard
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(input.value).then(() => {
    copyBtn.textContent = "✅ Copied";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
