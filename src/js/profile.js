import { loadHeaderFooter, mobileMenuToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { setupLogoutButton } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);

      } else {
        // alert("You must be logged in to view this page.");
        window.location.href = "../login/index.html";
      }
    })
    setupLogoutButton();

  });
});
