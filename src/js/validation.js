import { auth } from "./firebase.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import { signOut } from "firebase/auth";


const signupForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

// 

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = getSignupFormErrors(
      firstname_input?.value || "",
      email_input?.value || "",
      password_input?.value || "",
      repeat_password_input?.value || ""
    );

    if (errors.length > 0) {
      error_message.innerText = errors.join("\n");
      return;
    }

     // Proceed with Firebase signup
     handleSignup(email_input.value, password_input.value);
  });
}

// Handle login form submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = getLoginFormErrors(email_input?.value || "", password_input?.value || "");

    if (errors.length > 0) {
      error_message.innerText = errors.join("\n");
      return;
    }

    // Proceed with Firebase login
    handleLogin(email_input.value, password_input.value);
  });
}

function getSignupFormErrors(firstname, email, password, repeat_password) {
  let errors = [];
  if (firstname === "" || firstname === null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email === null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password === null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }
  if (repeat_password === "" || repeat_password === null) {
    errors.push("Confirm password");
    repeat_password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeat_password) {
    errors.push("Passwords do not match");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email === null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password === null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  return errors;
}

// handle signup
async function handleSignup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    alert("Signup successful! You can now log in.");
    window.location.href = "../login/index.html";
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert(error.message);
  }
}

// handle login
async function handleLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    // alert("Login successful!");
    window.location.href = "../index.html";
  } catch (error) {
    console.error("Error signing in:", error.message);

    // Map Firebase error codes to user-friendly messages
    let errorMessage = "Incorrect username or password.";

    // Display the custom error message
    error_message.innerText = errorMessage;
  }
}

const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

export function setupLogoutButton() {
  const logoutButtons = document.querySelectorAll(".logoutButton");
  if (logoutButtons.length > 0) {
    logoutButtons.forEach((logoutButton) => {
      logoutButton.addEventListener("click", async () => {
        try {
           await signOut(auth);
           // alert("You have logged out successfully.");
           window.location.href = "../login/index.html";
         } catch (error) {
           console.error("Error signing out:", error.message);
           alert("An error occurred while logging out. Please try again.");
         }
       });
    })
  }
}