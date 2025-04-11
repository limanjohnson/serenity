import { loadHeaderFooter, mobileMenuToggle } from "./utils.mjs"
import { navigationMenu } from "./navigation.mjs"

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
  });
})


