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

  // Function to set styles for an element
  const setElementStyle = (element, styles) => {
    Object.assign(element.style, styles);
  };

  // Function to add a hover effect to an element
  // On mouseover, the color of the element is changed to the provided color
  // On mouseout, the color of the element is changed based on the scroll position
  const addHoverEffect = (element, hoverColor, mouseoutColor) => {
    element.addEventListener("mouseover", function () {
      element.style.color = hoverColor;
    });
    element.addEventListener("mouseout", function () {
      element.style.color = mouseoutColor;
    });
  };

  // Check the navbar attribute
  // If it is 'filled', apply certain styles to the elements
  // If it is not 'filled', add a scroll event listener to apply styles based on the scroll position
  if (elements.navbarAttribute === "filled") {
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
    setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "#F1B937", color: "#444" });
    setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "#F6F7F9", color: "#444" });
    elements.menuIconLines.forEach((element) => {
      setElementStyle(element, { backgroundColor: "#444" });
    });
  } else {
    // Add a scroll event listener to apply styles based on the scroll position
    window.addEventListener("scroll", function () {
      if (window.scrollY > 120 && elements.navbarComponent.style.backgroundColor === "transparent") {
        // Apply styles for a scrolled down state
        setElementStyle(elements.navbarComponent, { transition: "background-color 0.3s ease-in-out", backgroundColor: "#FFFFFF" });
        setElementStyle(elements.logoColorElement, { transition: "opacity 0.3s ease-in-out", opacity: "1" });
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
        setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "#F4C65E", color: "#444" });
        setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "#F6F7F9", color: "#444" });
        elements.menuIconLines.forEach((element) => {
          setElementStyle(element, { backgroundColor: "#444" });
        });
      } else if (window.scrollY <= 119) {
        // Apply styles for a scrolled up state
        setElementStyle(elements.navbarComponent, { backgroundColor: "transparent" });
        setElementStyle(elements.logoColorElement, { opacity: "0" });
        elements.navDropdownTrigger.forEach((element) => {
          setElementStyle(element, { color: "#FFFFFF" });
          addHoverEffect(element, "#FFFFFF", "#FFFFFF");
        });
        elements.navbarSingleLink.forEach((element) => {
          if (!element.classList.contains("navbar_btn")) {
            setElementStyle(element, { color: "#FFFFFF" });
            addHoverEffect(element, "#FFFFFF", "#FFFFFF");
          }
        });
        setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "", color: "" });
        setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "", color: "" });
        elements.menuIconLines.forEach((element) => {
          setElementStyle(element, { backgroundColor: "" });
        });
      }
    });
  }
});
