window.onload = function () {
  const elements = {
    navbarComponent: document.querySelector(".navbar_component_updated"),
    logoColorElement: document.querySelector(".logo-color"),
    navDropdownTrigger: document.querySelectorAll(".nav_dropdown_trigger"),
    navbarSingleLink: document.querySelectorAll(".navbar_single_link"),
    navbarBtnPrimary: document.querySelector(".navbar_btn[navbar-btn='primary']"),
    navbarBtnSecondary: document.querySelector(".navbar_btn[navbar-btn='secondary']"),
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"),
    navToast: document.querySelector(".nav-toast"),
    dropdownCards: document.querySelectorAll(".nav_dropdown_card"),
  };

  if (!elements.navbarComponent) {
    console.log("No Nav Found.");
    return;
  }

  const navbarAttribute = elements.navbarComponent.getAttribute("navbar-default");
  elements.navbarComponent.style.opacity = "1";

  function updateNavbarState() {
    const isScrolled = window.scrollY > 120;
    const shouldBeFilled = navbarAttribute === "filled" || isScrolled;

    elements.navbarComponent.classList.toggle("navbar-scrolled", shouldBeFilled);
    elements.navbarComponent.classList.toggle("navbar-top", !shouldBeFilled);

    if (elements.navToast) {
      elements.navToast.classList.toggle("nav-toast-hidden", window.scrollY > 100);
    }

    updateHoverEffects(shouldBeFilled);
  }

  function updateHoverEffects(isFilled) {
    const hoverElements = [...elements.navDropdownTrigger, ...elements.navbarSingleLink];
    hoverElements.forEach((element) => {
      if (!element.classList.contains("navbar_btn")) {
        element.classList.toggle("hover-dark", isFilled);
        element.classList.toggle("hover-light", !isFilled);
      }
    });

    elements.navbarBtnPrimary.classList.toggle("btn-hover-filled", isFilled);
    elements.navbarBtnPrimary.classList.toggle("btn-hover-transparent", !isFilled);

    elements.navbarBtnSecondary.classList.toggle("btn-hover-filled", isFilled);
    elements.navbarBtnSecondary.classList.toggle("btn-hover-transparent", !isFilled);
  }

  function setupDropdownCardEffects() {
    elements.dropdownCards.forEach((dropdownCard) => {
      const dropdownTrigger = dropdownCard.previousElementSibling;
      dropdownCard.addEventListener("mouseenter", () => {
        if (dropdownCard.classList.contains("w--open")) {
          dropdownTrigger.classList.add("dropdown-hover");
        }
      });
      dropdownCard.addEventListener("mouseleave", () => {
        dropdownTrigger.classList.remove("dropdown-hover");
      });
    });
  }

  // Initial setup
  updateNavbarState();
  setupDropdownCardEffects();

  // Event listeners
  window.addEventListener("scroll", updateNavbarState);

  // Toast setup
  if (elements.navToast) {
    elements.navToast.style.opacity = "1";
    updateNavbarState(); // Set initial state
  } else {
    console.log("No toast found.");
  }
};
