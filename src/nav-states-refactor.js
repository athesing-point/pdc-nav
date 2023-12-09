document.addEventListener("DOMContentLoaded", () => {
  // Define all the elements that will be manipulated
  const elements = {
    navbarAttribute: document.body.getAttribute("navbar-default"), // Attribute of the navbar
    navbarComponent: document.querySelector(".navbar_component_updated"), // The navbar component
    logoColorElement: document.querySelector(".logo-color"), // The colored logo
    navDropdownTrigger: document.querySelectorAll(".nav_dropdown_trigger"), // The dropdown triggers in the navbar
    navbarSingleLink: document.querySelectorAll(".navbar_single_link"), // The single links in the navbar
    navbarBtnPrimary: document.querySelector(".navbar_btn[navbar-btn='primary']"), // The primary button in the navbar
    navbarBtnSecondary: document.querySelector(".navbar_btn[navbar-btn='secondary']"), // The secondary button in the navbar
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"), // The lines in the menu icon
    dropdownCards: document.querySelectorAll(".nav_dropdown_card"), // The dropdown cards in the navbar
  };

  // Initial style setup
  updateNavbarStyles(); // Update the styles of the navbar

  // Event listeners
  window.addEventListener("scroll", updateNavbarStyles); // Update the styles of the navbar when scrolling
  setupEventListeners(); // Setup the event listeners for the navbar

  // Function to update the styles of the navbar
  function updateNavbarStyles() {
    const isFilled = elements.navbarAttribute === "filled" || window.scrollY > 120; // Check if the navbar should be filled
    setNavbarStyles(isFilled); // Set the styles of the navbar
  }

  // Function to set the styles of the navbar
  function setNavbarStyles(isFilled) {
    const bgColor = isFilled ? "#FFFFFF" : "transparent"; // Background color of the navbar
    const textColor = isFilled ? "#444" : "#FFFFFF"; // Text color of the navbar
    const logoOpacity = isFilled ? "1" : "0"; // Opacity of the logo
    const btnPrimaryStyles = isFilled ? { backgroundColor: "#F4C65D", color: "#444" } : { backgroundColor: "transparent", color: "#FFFFFF" }; // Styles of the primary button
    const btnSecondaryStyles = isFilled ? { backgroundColor: "#F6F7F9", color: "#444" } : { backgroundColor: "transparent", color: "#FFFFFF" }; // Styles of the secondary button

    // Set the styles of the elements
    setElementStyle(elements.navbarComponent, { backgroundColor: bgColor });
    setElementStyle(elements.logoColorElement, { opacity: logoOpacity });
    setElementStyle(elements.navbarBtnPrimary, btnPrimaryStyles);
    setElementStyle(elements.navbarBtnSecondary, btnSecondaryStyles);
    elements.menuIconLines.forEach((line) => setElementStyle(line, { backgroundColor: textColor }));

    // Set the styles and add hover effect to the dropdown triggers
    elements.navDropdownTrigger.forEach((element) => {
      setElementStyle(element, { color: textColor });
      addHoverEffect(element, "#016789", textColor);
    });

    // Set the styles and add hover effect to the single links
    elements.navbarSingleLink.forEach((link) => {
      if (!link.classList.contains("navbar_btn")) {
        setElementStyle(link, { color: textColor });
        addHoverEffect(link, "#016789", textColor);
      }
    });

    // Add hover states to the buttons
    buttonHoverStates(elements.navbarBtnPrimary, "#f1b937", btnPrimaryStyles.backgroundColor);
    buttonHoverStates(elements.navbarBtnSecondary, "#ebebeb", btnSecondaryStyles.backgroundColor);
  }

  // Function to set the styles of an element
  function setElementStyle(element, styles) {
    Object.assign(element.style, styles);
  }

  // Function to add hover effect to an dropdown triggers
  function addHoverEffect(element, hoverColor, mouseoutColor) {
    element.addEventListener("mouseover", () => (element.style.color = hoverColor));
    element.addEventListener("mouseout", () => (element.style.color = mouseoutColor));
  }

  // Function to add hover states to a button
  function buttonHoverStates(element, hoverBgColor, originalBgColor) {
    element.addEventListener("mouseover", () => (element.style.backgroundColor = hoverBgColor));
    element.addEventListener("mouseout", () => (element.style.backgroundColor = originalBgColor));
  }

  // Function to setup the event listeners for the dropdown cards
  function setupEventListeners() {
    elements.dropdownCards.forEach((card) => {
      card.addEventListener("mouseover", () => handleDropdownCardHover(card, true));
      card.addEventListener("mouseout", () => handleDropdownCardHover(card, false));
    });
  }

  // Function to handle the hover state of a dropdown card
  function handleDropdownCardHover(dropdownCard, isHovering) {
    if (dropdownCard.classList.contains("w--open")) {
      const dropdownTrigger = dropdownCard.previousElementSibling;
      const color = elements.navbarAttribute === "filled" || window.scrollY > 120 ? (isHovering ? "#016789" : "#444") : "#FFFFFF";
      dropdownTrigger.style.color = color;
    }
  }
});
