
export function navigationMenu() {
  const navigationMenuElement = document.querySelector("#navigationMenu");

  function updateMenu() {
    if (innerWidth > 768) {
      navigationMenuElement.innerHTML = `
<a href="../index.html">Dashboard</a>
    <a href="../journal/index.html">Journal</a>
    <a href="../breathing/index.html">Breathe</a>
    <a href="../listing/index.html">List</a>
    <a href="../reflection/index.html">Reflect</a>
    <a href="../profile/index.html">Profile</a>
  `;
    } else {
      navigationMenuElement.innerHTML = `
    <a href="../index.html">Dashboard</a>
    <a href="../activities/index.html">Activities</a>
    <a href="../profile/index.html">Profile</a>
    `;``
    }
  }

  updateMenu()

  window.addEventListener("resize", updateMenu);


}

