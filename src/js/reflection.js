import { loadHeaderFooter, mobileMenuToggle, modalToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import { setupLogoutButton } from "./validation.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import ReflectingActivity from "./classes/ReflectingClass.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
    modalToggle();
    setupLogoutButton();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);

      } else {
        // alert("You must be logged in to view this page.");
        window.location.href = "../login/index.html";
      }
    })
    const reflectingActivity = new ReflectingActivity();
    const startButton = document.querySelector(".start");

    startButton.addEventListener("click", () => {
      reflectingActivity.displayStartingMessage();
    })
  });
});
