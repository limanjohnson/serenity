import { loadHeaderFooter, mobileMenuToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import { setupLogoutButton } from "./validation.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import {GoogleGenAI} from "@google/genai";
// import getZenQuote from "./zenquote.js";

document.addEventListener("DOMContentLoaded", async() => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
    setupLogoutButton();
    onAuthStateChanged(auth, (user) => {
      const username = document.querySelector("#loggedInUsersName");
      if (user && user.displayName) {
        // console.log("User is signed in:", user);
        username.innerText = user.displayName;

      } else {
        // alert("You must be logged in to view this page.");
        window.location.href = "../login/index.html";
      }
    })


  });
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "provide an inspiring quote that promotes healthy mental wellness and encourages self-care or emotional resilience?",
    });
    // console.log(response.text);

    const zenQuote = document.querySelector("#upliftingQuote")
    zenQuote.innerHTML = response.text;
});
