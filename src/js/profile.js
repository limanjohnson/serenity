import { loadHeaderFooter, mobileMenuToggle } from "../../../MindfulnessApp/src/js/utils.mjs"
import { navigationMenu } from "./navigation.mjs"

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
  });
})
