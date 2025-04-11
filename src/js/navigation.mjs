
export function navigationMenu() {
  const navigationMenuElement = document.querySelector("#navigationMenu");

  navigationMenuElement.innerHTML = `
  <a href="../index.html">Dashboard</a>
  <a href="../activities/index.html">Activities</a>
  <a href="../profile/index.html">Profile</a>
  `;
}
