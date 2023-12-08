// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  // Define all the elements that will be manipulated
  const elements = getElements();

  // Store references to the event listener functions
  let primaryBtnHoverFuncs, secondaryBtnHoverFuncs;

  // Define the buttons and their hover states immediately after they are defined
  defineButtonStates(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs);

  // Check the navbar attribute
  // If it is 'filled', apply certain styles to the elements
  // If it is not 'filled', add a scroll event listener to apply styles based on the scroll position
  checkNavbarAttribute(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs);
});

function getElements() {
  return {
    navbarAttribute: document.body.getAttribute("navbar-default"), // Attribute of the navbar
    navbarComponent: document.querySelector(".navbar_component_updated"), // The navbar component
    logoColorElement: document.querySelector(".logo-color"), // The colored logo
    logoWhiteElement: document.querySelector(".logo-white"), // The white logo
    navDropdownTrigger: document.querySelectorAll(".nav_dropdown_trigger"), // The dropdown triggers in the navbar
    navbarSingleLink: document.querySelectorAll(".navbar_single_link"), // The single links in the navbar
    navbarBtnPrimary: document.querySelector(".navbar_btn[navbar-btn='primary']"), // The primary button in the navbar
    navbarBtnSecondary: document.querySelector(".navbar_btn[navbar-btn='secondary']"), // The secondary button in the navbar
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"), // The lines in the menu icon
  };
}

function defineButtonStates(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs) {
  if (elements.navbarAttribute === "filled" || window.scrollY > 120) {
    setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "#F4C65D", color: "#444" });
    setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "#F6F7F9", color: "#444" });
    primaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnPrimary, "#f1b937", "#F4C65D");
    secondaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnSecondary, "#ebebeb", "#F6F7F9");
  } else {
    setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "transparent", color: "#FFFFFF" });
    setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "transparent", color: "#FFFFFF" });
  }
}

function checkNavbarAttribute(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs) {
  if (elements.navbarAttribute === "filled" || window.scrollY > 120) {
    applyFilledNavbarStyles(elements);
  }
  // Add a scroll event listener to apply styles based on the scroll position
  window.addEventListener("scroll", function () {
    applyScrollStyles(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs);
  });
}

function applyFilledNavbarStyles(elements) {
  // Apply styles for a filled navbar
  setElementStyle(elements.navbarComponent, { backgroundColor: "#FFFFFF" });
  setElementStyle(elements.logoColorElement, { opacity: "1" });
  elements.navDropdownTrigger.forEach((element) => {
    setElementStyle(element, { color: "#444" });
    addHoverEffect(element, "#016789", "#444");
  });
  elements.navbarSingleLink.forEach((element) => {
    if (!element.classList.contains("navbar_btn")) {
      setElementStyle(element, { color: "#444" });
      addHoverEffect(element, "#016789", "#444");
    }
  });
  elements.menuIconLines.forEach((element) => {
    setElementStyle(element, { backgroundColor: "#444" });
  });
}

function applyScrollStyles(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs) {
  if (window.scrollY > 120 && elements.navbarComponent.style.backgroundColor === "transparent") {
    applyScrolledDownStyles(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs);
  } else if (window.scrollY <= 119 && elements.navbarAttribute !== "filled") {
    applyScrolledUpStyles(elements, primaryBtnHoverFuncs, secondaryBtnHoverFuncs);
  }
  // Add mouseover and mouseout event listeners to each dropdown card
  const dropdownCards = document.querySelectorAll(".nav_dropdown_card");
  dropdownCards.forEach((dropdownCard) => {
    dropdownCard.addEventListener("mouseover", function () {
      if (dropdownCard.classList.contains("w--open") && (elements.navbarAttribute === "filled" || window.scrollY > 120)) {
        const dropdownTrigger = dropdownCard.previousElementSibling;
        dropdownTrigger.style.color = "#016789";
      }
    });

    dropdownCard.addEventListener("mouseout", function () {
      if (dropdownCard.classList.contains("w--open") && (elements.navbarAttribute === "filled" || window.scrollY > 120)) {
        const dropdownTrigger = dropdownCard.previousElementSibling;
        const color = elements.navbarAttribute === "filled" || window.scrollY > 120 ? "#444" : "#FFFFFF";
        dropdownTrigger.style.color = color;
      }
    });
  });
}

// Function to set styles for an element
function setElementStyle(element, styles) {
  Object.assign(element.style, styles);
}

// Function to add a hover effect to an element
// On mouseover, the color of the element is changed to the provided color
// On mouseout, the color of the element is changed based on the scroll position
function addHoverEffect(element, hoverColor, mouseoutColor) {
  element.addEventListener("mouseover", function () {
    element.style.color = hoverColor;
  });
  element.addEventListener("mouseout", function () {
    element.style.color = mouseoutColor;
  });
}

// Function to handle button hovers
function buttonHoverStates(element, hoverBgColor, originalBgColor) {
  const mouseoverFunc = function () {
    this.style.backgroundColor = hoverBgColor;
  };
  const mouseoutFunc = function () {
    this.style.backgroundColor = originalBgColor;
  };
  element.addEventListener("mouseover", mouseoverFunc);
  element.addEventListener("mouseout", mouseoutFunc);
  return { mouseoverFunc, mouseoutFunc };
}
