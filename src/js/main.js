import { loadHeaderFooter, mobileMenuToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import zenQuoteGeneration from "./zenquote.mjs";
import { setupLogoutButton } from "./validation.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
    zenQuoteGeneration();
    setupLogoutButton();
    onAuthStateChanged(auth, (user) => {
      const username = document.querySelector("#loggedInUsersName");
      if (user && user.displayName) {
        console.log("User is signed in:", user);
        username.innerText = user.displayName;

      } else {
        // alert("You must be logged in to view this page.");
        window.location.href = "../login/index.html";
      }
    })
  });
});
