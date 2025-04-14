import { auth } from "./firebase.js";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";

const signupForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

signupForm.addEventListener("submit", (e) => {
  // e.preventDefault(); Prevent Submit

  let errors = [];

  if (firstname_input) {
    // if we have a firstname input, then we are in the signup
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value,
    );
  } else {
    // if we dont have firstname input, then we are in the login
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join("\n");
  }
});

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

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = email_input.value;
    const password = password_input.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      alert("Signup successful! You can now log in.");
      window.location.href = "../login/index.html";

    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = email_input.value;
    const password = password_input.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      alert("Login successful!");
      window.location.href = "../profile/index.html";
    } catch (error) {
      console.error("Error signing in:", error.message);
      error_message.innerText = error.message;
    }
  });
}