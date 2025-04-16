import { loadHeaderFooter, mobileMenuToggle, modalToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import { setupLogoutButton } from "./validation.js";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
    modalToggle();
    // zenQuoteGeneration();
    setupLogoutButton();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User is signed in:", user);

      } else {
        // alert("You must be logged in to view this page.");
        window.location.href = "../login/index.html";
      }
    })

    const saveButton = document.querySelector(".save");
    const textarea = document.querySelector("#modal-content-journal textarea");

    saveButton.addEventListener("click", () => {
      const content = textarea.value.trim();
      if (content) {
        saveJournalEntry(content);
        textarea.value = "";
      } else {
        alert("Please enter some content before saving.");
      }
    });
  });
});

async function saveJournalEntry(content) {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in to save a journal entry.");
    return;
  }

  try {
    await addDoc(collection(db, "journalEntries"), {
      userID: user.uid,
      content: content,
      timestamp: serverTimestamp(),
    });
    alert("Journal entry saved successfully!");
  } catch (error) {
    // console.error("Error saving journal entry: ", error);
    alert("Failed to save journal entry. Please try again.");
  }
}