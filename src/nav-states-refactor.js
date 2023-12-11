// Constants for repeated values
const FILLED = "filled";
const SCROLL_THRESHOLD = 120;
const COLORS = {
  primary: "#F4C65D",
  secondary: "#F6F7F9",
  hoverPrimary: "#f1b937",
  hoverSecondary: "#ebebeb",
  default: "#444",
  white: "#FFFFFF",
  transparent: "transparent",
};

// Configuration object for styles
const STYLES = {
  filled: {
    navbarComponent: { backgroundColor: COLORS.white },
    logoColorElement: { opacity: "1" },
    navDropdownTrigger: { color: COLORS.default },
    navbarSingleLink: { color: COLORS.default },
    navbarBtnPrimary: { backgroundColor: COLORS.primary, color: COLORS.default },
    navbarBtnSecondary: { backgroundColor: COLORS.secondary, color: COLORS.default },
    menuIconLines: { backgroundColor: COLORS.default },
  },
  transparent: {
    navbarComponent: { backgroundColor: COLORS.transparent },
    logoColorElement: { opacity: "0" },
    navDropdownTrigger: { color: COLORS.white },
    navbarSingleLink: { color: COLORS.white },
    navbarBtnPrimary: { backgroundColor: COLORS.transparent, color: COLORS.white },
    navbarBtnSecondary: { backgroundColor: COLORS.transparent, color: COLORS.white },
    menuIconLines: { backgroundColor: "" },
  },
};

// Function to set styles for an element
const setElementStyle = (element, styles) => {
  Object.assign(element.style, styles);
};

// Function to add a hover effect to an element
const addHoverEffect = (element, hoverColor, mouseoutColor) => {
  element.addEventListener("mouseover", () => (element.style.color = hoverColor));
  element.addEventListener("mouseout", () => (element.style.color = mouseoutColor));
};

// Function to handle button hovers
function buttonHoverStates(element, hoverBgColor, originalBgColor) {
  const mouseoverFunc = () => (element.style.backgroundColor = hoverBgColor);
  const mouseoutFunc = () => (element.style.backgroundColor = originalBgColor);
  element.addEventListener("mouseover", mouseoverFunc);
  element.addEventListener("mouseout", mouseoutFunc);
  return { mouseoverFunc, mouseoutFunc };
}

// Function to apply styles based on the navbar attribute or scroll position
function applyStyles(elements, navbarAttribute, scrollY) {
  const isFilled = navbarAttribute === FILLED || scrollY > SCROLL_THRESHOLD;
  const styles = isFilled ? STYLES.filled : STYLES.transparent;
  for (const elementName in styles) {
    setElementStyle(elements[elementName], styles[elementName]);
  }
  return isFilled;
}

// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", (event) => {
  // Define all the elements that will be manipulated
  const elements = {
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

  // Apply initial styles based on the navbar attribute or scroll position
  let isFilled = applyStyles(elements, elements.navbarAttribute, window.scrollY);

  // Add event listeners for hover effects
  elements.navDropdownTrigger.forEach((element) => addHoverEffect(element, COLORS.primary, isFilled ? COLORS.default : COLORS.white));
  elements.navbarSingleLink.forEach((element) => addHoverEffect(element, COLORS.primary, isFilled ? COLORS.default : COLORS.white));
  buttonHoverStates(elements.navbarBtnPrimary, COLORS.hoverPrimary, isFilled ? COLORS.primary : COLORS.transparent);
  buttonHoverStates(elements.navbarBtnSecondary, COLORS.hoverSecondary, isFilled ? COLORS.secondary : COLORS.transparent);

  // Event listener for when the window is scrolled
  window.addEventListener("scroll", () => {
    const newIsFilled = applyStyles(elements, elements.navbarAttribute, window.scrollY);
    if (newIsFilled !== isFilled) {
      // Update hover effects if the filled state has changed
      elements.navDropdownTrigger.forEach((element) => addHoverEffect(element, COLORS.primary, newIsFilled ? COLORS.default : COLORS.white));
      elements.navbarSingleLink.forEach((element) => addHoverEffect(element, COLORS.primary, newIsFilled ? COLORS.default : COLORS.white));
      buttonHoverStates(elements.navbarBtnPrimary, COLORS.hoverPrimary, newIsFilled ? COLORS.primary : COLORS.transparent);
      buttonHoverStates(elements.navbarBtnSecondary, COLORS.hoverSecondary, newIsFilled ? COLORS.secondary : COLORS.transparent);
      isFilled = newIsFilled;
    }
  });
});
