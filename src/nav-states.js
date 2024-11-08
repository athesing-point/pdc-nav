window.onload = function () {
  // Define all the elements that will be manipulated
  const elements = {
    navbarComponent: document.querySelector(".navbar_component_updated"),
    logoColorElement: document.querySelector(".logo-color"),
    logoWhiteElement: document.querySelector(".logo-white"),
    navDropdownTrigger: document.querySelectorAll(".nav_dropdown_trigger"),
    navbarSingleLink: document.querySelectorAll(".navbar_single_link"),
    navbarBtnPrimary: document.querySelector(".navbar_btn[navbar-btn='primary']"),
    navbarBtnSecondary: document.querySelector(".navbar_btn[navbar-btn='secondary']"),
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"),
    navToast: document.querySelector(".nav-toast"),
  };

  // Check if the navbar component exists
  if (!elements.navbarComponent) {
    console.log("No Nav Found.");
    return;
  }

  // Get the navbar attribute from the navbar component
  const navbarAttribute = elements.navbarComponent.getAttribute("navbar-default");

  // Disable all transitions initially
  elements.navbarComponent.style.transition = "none";
  if (elements.navToast) {
    elements.navToast.style.transition = "none";
  }

  // Set initial states based on scroll position
  const setInitialStates = () => {
    if (window.scrollY > 64 || navbarAttribute === "filled") {
      // Apply filled navbar styles
      elements.navbarComponent.style.backgroundColor = "#FFFFFF";
      elements.logoColorElement.style.opacity = "1";
      elements.navDropdownTrigger.forEach((element) => {
        element.style.color = "#444";
      });
      elements.navbarSingleLink.forEach((element) => {
        if (!element.classList.contains("navbar_btn")) {
          element.style.color = "#444";
        }
      });
      elements.menuIconLines.forEach((element) => {
        element.style.backgroundColor = "#444";
      });

      // Set button styles
      setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "#F4C65D", color: "#444" });
      setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "#F6F7F9", color: "#444" });
    }

    // Set toast position if scrolled down
    if (elements.navToast && window.scrollY > 100) {
      elements.navToast.style.marginTop = "-2.5rem";
    }
  };

  // Run initial state setup
  setInitialStates();

  // Re-enable transitions after a brief delay
  setTimeout(() => {
    elements.navbarComponent.style.transition = "background-color 0.2s linear";
    if (elements.navToast) {
      elements.navToast.style.transition = "margin-top 0.2s linear";
    }
    elements.navbarComponent.style.opacity = "1";
    if (elements.navToast) {
      elements.navToast.style.opacity = "1";
    }
  }, 50);

  // Rest of your existing code...
  // (Keep all the existing scroll handlers and other functionality)
};

//test
