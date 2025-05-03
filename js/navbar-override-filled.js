// Navbar override for filled state with transparent background at top
// Include this file only on the specific page needing this behavior

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar_component_updated");
  const logoColor = document.querySelector(".logo-color");
  const navDropdowns = document.querySelectorAll(".nav_dropdown_trigger");
  const navLinks = document.querySelectorAll(".navbar_single_link:not(.navbar_btn)");
  const btnPrimary = document.querySelector('.navbar_btn[navbar-btn="primary"]');
  const btnSecondary = document.querySelector('.navbar_btn[navbar-btn="secondary"]');
  const menuIconLines = document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom");

  function setFilledState() {
    if (logoColor) logoColor.style.opacity = "1";
    navDropdowns.forEach((el) => (el.style.color = "#444"));
    navLinks.forEach((el) => (el.style.color = "#444"));
    if (btnPrimary) {
      btnPrimary.style.backgroundColor = "#F4C65E";
      btnPrimary.style.color = "#444";
    }
    if (btnSecondary) {
      btnSecondary.style.backgroundColor = "#F6F7F9";
      btnSecondary.style.color = "#444";
    }
    menuIconLines.forEach((el) => (el.style.backgroundColor = "#444"));
  }

  function updateNavbarOverride() {
    if (!navbar) return;
    if (window.scrollY === 0) {
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";
      navbar.style.borderBottom = "none";
      setFilledState();
    } else {
      navbar.style.backgroundColor = "#fff";
      navbar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.03)";
      navbar.style.borderBottom = "1px solid #eaeaea";
      setFilledState();
    }
  }

  updateNavbarOverride();
  window.addEventListener("scroll", updateNavbarOverride);
});
