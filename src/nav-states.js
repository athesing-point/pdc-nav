// Run this code immediately before window.onload
(function () {
  // Set initial states based on scroll position
  const setInitialStates = () => {
    const navbarComponent = document.querySelector(".navbar_component_updated");
    const logoColorElement = document.querySelector(".logo-color");
    const navDropdownTrigger = document.querySelectorAll(".nav_dropdown_trigger");
    const navbarSingleLink = document.querySelectorAll(".navbar_single_link");
    const menuIconLines = document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom");
    const navToast = document.querySelector(".nav-toast");
    const navbarBtnPrimary = document.querySelector(".navbar_btn[navbar-btn='primary']");
    const navbarBtnSecondary = document.querySelector(".navbar_btn[navbar-btn='secondary']");

    if (!navbarComponent) return;

    // Disable transitions initially
    navbarComponent.style.transition = "none";
    if (navToast) {
      navToast.style.transition = "none";
    }

    if (window.scrollY > 64 || navbarComponent.getAttribute("navbar-default") === "filled") {
      // Apply filled navbar styles
      navbarComponent.style.backgroundColor = "#FFFFFF";
      logoColorElement.style.opacity = "1";
      navDropdownTrigger.forEach((element) => {
        element.style.color = "#444";
      });
      navbarSingleLink.forEach((element) => {
        if (!element.classList.contains("navbar_btn")) {
          element.style.color = "#444";
        }
      });
      menuIconLines.forEach((element) => {
        element.style.backgroundColor = "#444";
      });

      // Set button styles
      if (navbarBtnPrimary) {
        navbarBtnPrimary.style.backgroundColor = "#F4C65D";
        navbarBtnPrimary.style.color = "#444";
      }
      if (navbarBtnSecondary) {
        navbarBtnSecondary.style.backgroundColor = "#F6F7F9";
        navbarBtnSecondary.style.color = "#444";
      }
    }

    // Set toast position if scrolled down
    if (navToast && window.scrollY > 100) {
      navToast.style.marginTop = "-2.5rem";
    }

    // Make navbar visible
    navbarComponent.style.opacity = "1";
    if (navToast) {
      navToast.style.opacity = "1";
    }
  };

  // Run initial setup
  setInitialStates();

  // Re-enable transitions after a brief delay
  setTimeout(() => {
    const navbarComponent = document.querySelector(".navbar_component_updated");
    const navToast = document.querySelector(".nav-toast");

    if (navbarComponent) {
      navbarComponent.style.transition = "background-color 0.2s linear";
    }
    if (navToast) {
      navToast.style.transition = "margin-top 0.2s linear";
    }
  }, 50);
})();

// Rest of your window.onload code
window.onload = function () {
  // Your existing window.onload code here
  // (Keep all the scroll handlers and other functionality)
};
