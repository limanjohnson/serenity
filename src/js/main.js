import { loadHeaderFooter, mobileMenuToggle } from "./utils.mjs";
import { navigationMenu } from "./navigation.mjs";
import zenQuoteGeneration from "./zenquote.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    mobileMenuToggle();
    navigationMenu();
    zenQuoteGeneration();
  });
});
