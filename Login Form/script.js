const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const strength = document.getElementById("strengthIndicator");
const togglePassword = document.getElementById("togglePassword");
const feedback = document.getElementById("feedback");
const darkToggle = document.getElementById("darkToggle");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;
  emailError.textContent = "";
  passwordError.textContent = "";
  feedback.textContent = "";

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!emailPattern.test(email.value)) {
    emailError.textContent = "Enter a valid email.";
    valid = false;
  }

  // Password validation
  if (!password.value.trim()) {
    passwordError.textContent = "Password is required.";
    valid = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    valid = false;
  }

  if (valid) {
    feedback.style.color = "var(--success)";
    feedback.textContent = "Login Successful ✅";
  } else {
    feedback.style.color = "var(--error)";
    feedback.textContent = "Please correct the errors above.";
  }
});

// Password Strength Meter
password.addEventListener("input", () => {
  const val = password.value;
  strength.className = "strength";
  if (val.length > 0 && val.length < 6) {
    strength.classList.add("weak");
  } else if (val.length >= 6 && !/[A-Z]/.test(val)) {
    strength.classList.add("medium");
  } else if (val.length >= 6 && /[A-Z]/.test(val) && /\d/.test(val)) {
    strength.classList.add("strong");
  }
});

// Show/Hide Password
togglePassword.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
  togglePassword.textContent = password.type === "password" ? "Show" : "Hide";
});

// Dark Mode Toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
