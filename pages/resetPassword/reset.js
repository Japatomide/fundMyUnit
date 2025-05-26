document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".auth-tab-button");
  const formSections = document.querySelectorAll(".auth-form-section");
  const toggleAuthLink = document.getElementById("toggleLink");
  const toggleAuthText = document.getElementById("toggleText");
  const messageBox = document.getElementById("messageBox");
  const forgotPasswordLink = document.querySelector(
    '.form-link[data-target-form="forgotPassword"]'
  );

  // Function to show message
  function showMessage(message, type = "info") {
    messageBox.textContent = message;
    messageBox.className = "message-box " + type; // Reset classes and add new type
    messageBox.style.display = "block";
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000); // Hide after 5 seconds
  }

  // Function to switch forms
  function switchForm(formId) {
    formSections.forEach((section) => {
      section.classList.remove("active");
    });
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });

    document.getElementById(formId).classList.add("active");
    // Find the corresponding tab button and activate it
    const correspondingTabButton = document.querySelector(
      `.auth-tab-button[data-form="${formId.replace("Form", "")}"]`
    );
    if (correspondingTabButton) {
      correspondingTabButton.classList.add("active");
    }

    // Update toggle link text based on current form
    if (formId === "signInForm") {
      toggleAuthText.textContent = "Don't have an account?";
      toggleAuthLink.textContent = "Sign Up";
      toggleAuthLink.dataset.targetForm = "signUp";
      toggleAuthLink.style.display = "inline"; // Ensure it's visible
      toggleAuthText.style.display = "inline"; // Ensure it's visible
    } else if (formId === "signUpForm") {
      toggleAuthText.textContent = "Already have an account?";
      toggleAuthLink.textContent = "Sign In";
      toggleAuthLink.dataset.targetForm = "signIn";
      toggleAuthLink.style.display = "inline"; // Ensure it's visible
      toggleAuthText.style.display = "inline"; // Ensure it's visible
    } else if (formId === "forgotPasswordForm") {
      toggleAuthText.textContent = ""; // Hide text
      toggleAuthLink.textContent = "Back to Sign In";
      toggleAuthLink.dataset.targetForm = "signIn";
      toggleAuthLink.style.display = "block"; // Make it a block for better centering
    }
    messageBox.style.display = "none"; // Hide any previous messages
  }

  // Event listeners for tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetForm = button.dataset.form + "Form";
      switchForm(targetForm);
    });
  });

  // Event listener for toggle link
  toggleAuthLink.addEventListener("click", (e) => {
    e.preventDefault();
    const targetForm = toggleAuthLink.dataset.targetForm + "Form";
    switchForm(targetForm);
  });

  // Event listener for "Forgot Password?" link
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      const targetForm = forgotPasswordLink.dataset.targetForm + "Form";
      switchForm(targetForm);
    });
  }

  // Initial form display
  switchForm("signInForm"); // Default to Sign In form on load

  // --- Form Submission Handlers (Client-side validation example) ---

  function handleSignIn(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    if (!email || !password) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    // In a real application, you would send this data to your backend
    // For demonstration, we'll just show a success message
    showMessage(`Signing in with Email: ${email}...`, "info");
    console.log("Sign In Attempt:", { email, password });
    // Simulate API call
    setTimeout(() => {
      showMessage("Sign In successful!", "success");
      // Redirect or update UI
    }, 1500);
  }

  function handleSignUp(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!email || !password || !confirmPassword) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters long.", "error");
      return;
    }

    // In a real application, you would send this data to your backend
    // For demonstration, we'll just show a success message
    showMessage(`Signing up with Email: ${email}...`, "info");
    console.log("Sign Up Attempt:", { email, password });
    // Simulate API call
    setTimeout(() => {
      showMessage("Account created successfully!", "success");
      // Optionally switch to sign-in form after successful signup
      switchForm("signInForm");
    }, 1500);
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById("forgotPasswordEmail").value;

    if (!email) {
      showMessage("Please enter your email address.", "error");
      return;
    }

    showMessage(`Sending password reset link to ${email}...`, "info");
    console.log("Forgot Password Request:", { email });
    // Simulate API call
    setTimeout(() => {
      showMessage(
        "If an account with that email exists, a reset link has been sent.",
        "success"
      );
      // Optionally switch back to sign-in form
      switchForm("signInForm");
    }, 2000);
  }

  // Attach functions to global scope for inline onsubmit
  window.handleSignIn = handleSignIn;
  window.handleSignUp = handleSignUp;
  window.handleForgotPassword = handleForgotPassword;
});
