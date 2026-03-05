// ===========================
// FORM VALIDATION AND SPAM FILTERING
// ===========================

const form = document.querySelector("#contactForm");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const messageField = document.querySelector("#message");
const submitBtn = document.querySelector("#submitBtn");

// Error message elements
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const messageError = document.querySelector("#messageError");
const submissionStatus = document.querySelector("#submissionStatus");

// ===========================
// 1. RATE LIMITING (Max 3 submissions per minute)
// ===========================
let submitTimes = [];

function isRateLimited() {
  const now = Date.now();
  // Keep only submissions from the last 60 seconds
  submitTimes = submitTimes.filter(time => now - time < 60000);
  // If already 3 submissions, block
  if (submitTimes.length >= 3) {
    return true;
  }
  // Otherwise, record this submission
  submitTimes.push(now);
  return false;
}

// ===========================
// 2. TIME-BASED FILTERING (Reject if submitted in less than 2 seconds)
// ===========================
const formLoadTime = Date.now();

function isTooFast() {
  const submitTime = Date.now();
  const secondsTaken = (submitTime - formLoadTime) / 1000;
  return secondsTaken < 2;
}

// ===========================
// 3. SPAM KEYWORD DETECTION
// ===========================
const spamWords = [
  "free money",
  "buy now",
  "click here",
  "subscribe",
  "promo",
  "limited offer",
  "act now",
  "guaranteed",
  "no credit card",
  "winner",
  "congratulations",
  "claim prize",
  "viagra",
  "cialis",
  "casino",
  "lottery",
  "nigerian prince"
];

function containsSpam(message) {
  const lowerMessage = message.toLowerCase();
  return spamWords.some(word => lowerMessage.includes(word));
}

// ===========================
// 4. COMPREHENSIVE VALIDATION
// ===========================

function isValidEmail(email) {
  // Standard email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  // Name should be at least 2 characters and not contain numbers or special characters
  return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name);
}

function isValidMessage(message) {
  // Message should be between 10 and 2000 characters
  const length = message.trim().length;
  return length >= 10 && length <= 2000;
}

// ===========================
// 5. REAL-TIME FIELD VALIDATION
// ===========================

nameField.addEventListener("blur", function() {
  if (nameField.value && !isValidName(nameField.value)) {
    nameError.textContent = "Name must be at least 2 characters and contain only letters.";
    nameError.classList.remove("d-none");
    nameField.classList.add("is-invalid");
  } else {
    nameError.classList.add("d-none");
    nameField.classList.remove("is-invalid");
  }
});

emailField.addEventListener("blur", function() {
  if (emailField.value && !isValidEmail(emailField.value)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.classList.remove("d-none");
    emailField.classList.add("is-invalid");
  } else {
    emailError.classList.add("d-none");
    emailField.classList.remove("is-invalid");
  }
});

messageField.addEventListener("blur", function() {
  if (messageField.value) {
    if (!isValidMessage(messageField.value)) {
      messageError.textContent = "Message must be between 10 and 2000 characters.";
      messageError.classList.remove("d-none");
      messageField.classList.add("is-invalid");
    } else if (containsSpam(messageField.value)) {
      messageError.textContent = "Your message contains blocked spam keywords.";
      messageError.classList.remove("d-none");
      messageField.classList.add("is-invalid");
    } else {
      messageError.classList.add("d-none");
      messageField.classList.remove("is-invalid");
    }
  }
});

// Clear error when user starts typing
nameField.addEventListener("focus", function() {
  nameError.classList.add("d-none");
  nameField.classList.remove("is-invalid");
});

emailField.addEventListener("focus", function() {
  emailError.classList.add("d-none");
  emailField.classList.remove("is-invalid");
});

messageField.addEventListener("focus", function() {
  messageError.classList.add("d-none");
  messageField.classList.remove("is-invalid");
});

// ===========================
// 6. FORM SUBMISSION VALIDATION
// ===========================

form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Clear previous error messages
  submissionStatus.classList.add("d-none");
  
  // 1. Check if submission is too fast (bot detection)
  if (isTooFast()) {
    submissionStatus.textContent = "❌ Submission was too fast. Please slow down.";
    submissionStatus.classList.remove("d-none");
    submissionStatus.classList.add("text-danger");
    return;
  }
  
  // 2. Validate all fields
  if (!nameField.value.trim()) {
    nameError.textContent = "Name is required.";
    nameError.classList.remove("d-none");
    nameField.classList.add("is-invalid");
    return;
  }
  
  if (!isValidName(nameField.value)) {
    nameError.textContent = "Name must be at least 2 characters and contain only letters.";
    nameError.classList.remove("d-none");
    nameField.classList.add("is-invalid");
    return;
  }
  
  if (!emailField.value.trim()) {
    emailError.textContent = "Email is required.";
    emailError.classList.remove("d-none");
    emailField.classList.add("is-invalid");
    return;
  }
  
  if (!isValidEmail(emailField.value)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.classList.remove("d-none");
    emailField.classList.add("is-invalid");
    return;
  }
  
  if (!messageField.value.trim()) {
    messageError.textContent = "Message is required.";
    messageError.classList.remove("d-none");
    messageField.classList.add("is-invalid");
    return;
  }
  
  if (!isValidMessage(messageField.value)) {
    messageError.textContent = "Message must be between 10 and 2000 characters.";
    messageError.classList.remove("d-none");
    messageField.classList.add("is-invalid");
    return;
  }
  
  // 3. Check for spam keywords
  if (containsSpam(messageField.value)) {
    messageError.textContent = "Your message contains blocked spam keywords.";
    messageError.classList.remove("d-none");
    messageField.classList.add("is-invalid");
    return;
  }
  
  // 4. Check rate limiting
  if (isRateLimited()) {
    submissionStatus.textContent = "❌ Too many submissions. Please wait a minute before submitting again.";
    submissionStatus.classList.remove("d-none");
    submissionStatus.classList.add("text-danger");
    return;
  }
  
  // 5. All validations passed - show success message
  submissionStatus.textContent = "✓ Form submitted successfully! We'll get back to you soon.";
  submissionStatus.classList.remove("d-none");
  submissionStatus.classList.remove("text-danger");
  submissionStatus.classList.add("text-success");
  
  // Disable submit button temporarily
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  
  // Reset button after 2 seconds
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send";
  }, 2000);
  
  // Submit the form after validation
  setTimeout(() => {
    form.submit();
  }, 1000);
});

console.log("✓ Form validation script loaded successfully");
console.log("Spam Filtering Features Enabled:");
console.log("  - Rate Limiting: Max 3 submissions per minute");
console.log("  - Time-based Filtering: Minimum 2 seconds before submission");
console.log("  - Spam Keyword Detection: " + spamWords.length + " keywords blocked");
console.log("  - Comprehensive Validation: Email, Name, Message length");
console.log("  - User Feedback: Real-time validation messages");
