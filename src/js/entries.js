import { loadHeaderFooter, mobileMenuToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import { setupLogoutButton } from "./validation.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.js";
import { getDocs, query, where, collection } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", async () => {
    loadHeaderFooter().then(() => {
      mobileMenuToggle();
      navigationMenu();
      setupLogoutButton();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
        //   console.log("User is signed in:", user);
        await getUserJournalEntries(user.uid);

        } else {
          // alert("You must be logged in to view this page.");
          window.location.href = "../login/index.html";
        }
      })
    });
  });

  async function getUserJournalEntries(userId) {
    try {
        const entriesQuery = query(
            collection(db, "journalEntries"),
            where("userID", "==", userId)
        );

        const querySnapshot = await getDocs(entriesQuery);

        const entriesList = document.getElementById("journal-entries-list");
        entriesList.innerHTML = ""; // Clear existing entries

        querySnapshot.forEach((doc) => {
            const entry = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.timestamp.toDate().toLocaleString()}: ${entry.content}`;
            entriesList.appendChild(listItem);
        });
    } catch (error) {
    // console.error("Error fetching journal entries: ", error);
    alert("failed to fetch journal entries. Please try again.");
    }
  }