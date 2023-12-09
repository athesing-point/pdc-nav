document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const elements = {
    navbarAttribute: document.body.getAttribute("navbar-default"),
    navbarComponent: document.querySelector(".navbar_component_updated"),
    logoColorElement: document.querySelector(".logo-color"),
    navDropdownTrigger: document.querySelectorAll(".nav_dropdown_trigger"),
    navbarSingleLink: document.querySelectorAll(".navbar_single_link"),
    navbarBtnPrimary: document.querySelector(".navbar_btn[navbar-btn='primary']"),
    navbarBtnSecondary: document.querySelector(".navbar_btn[navbar-btn='secondary']"),
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"),
    dropdownCards: document.querySelectorAll(".nav_dropdown_card"),
  };

  // Initial style setup
  updateNavbarStyles();

  // Event listeners
  window.addEventListener("scroll", updateNavbarStyles);
  setupEventListeners();

  function updateNavbarStyles() {
    const isFilled = elements.navbarAttribute === "filled" || window.scrollY > 120;
    setNavbarStyles(isFilled);
  }

  function setNavbarStyles(isFilled) {
    const bgColor = isFilled ? "#FFFFFF" : "transparent";
    const textColor = isFilled ? "#444" : "#FFFFFF";
    const logoOpacity = isFilled ? "1" : "0";
    const btnPrimaryStyles = isFilled ? { backgroundColor: "#F4C65D", color: "#444" } : { backgroundColor: "transparent", color: "#FFFFFF" };
    const btnSecondaryStyles = isFilled ? { backgroundColor: "#F6F7F9", color: "#444" } : { backgroundColor: "transparent", color: "#FFFFFF" };

    setElementStyle(elements.navbarComponent, { backgroundColor: bgColor });
    setElementStyle(elements.logoColorElement, { opacity: logoOpacity });
    setElementStyle(elements.navbarBtnPrimary, btnPrimaryStyles);
    setElementStyle(elements.navbarBtnSecondary, btnSecondaryStyles);
    elements.menuIconLines.forEach((line) => setElementStyle(line, { backgroundColor: textColor }));

    elements.navDropdownTrigger.forEach((element) => {
      setElementStyle(element, { color: textColor });
      addHoverEffect(element, "#016789", textColor);
    });

    elements.navbarSingleLink.forEach((link) => {
      if (!link.classList.contains("navbar_btn")) {
        setElementStyle(link, { color: textColor });
        addHoverEffect(link, "#016789", textColor);
      }
    });

    buttonHoverStates(elements.navbarBtnPrimary, "#f1b937", btnPrimaryStyles.backgroundColor);
    buttonHoverStates(elements.navbarBtnSecondary, "#ebebeb", btnSecondaryStyles.backgroundColor);
  }

  function setElementStyle(element, styles) {
    Object.assign(element.style, styles);
  }

  function addHoverEffect(element, hoverColor, mouseoutColor) {
    element.addEventListener("mouseover", () => (element.style.color = hoverColor));
    element.addEventListener("mouseout", () => (element.style.color = mouseoutColor));
  }

  function buttonHoverStates(element, hoverBgColor, originalBgColor) {
    element.addEventListener("mouseover", () => (element.style.backgroundColor = hoverBgColor));
    element.addEventListener("mouseout", () => (element.style.backgroundColor = originalBgColor));
  }

  function setupEventListeners() {
    elements.dropdownCards.forEach((card) => {
      card.addEventListener("mouseover", () => handleDropdownCardHover(card, true));
      card.addEventListener("mouseout", () => handleDropdownCardHover(card, false));
    });
  }

  function handleDropdownCardHover(dropdownCard, isHovering) {
    if (dropdownCard.classList.contains("w--open")) {
      const dropdownTrigger = dropdownCard.previousElementSibling;
      const color = elements.navbarAttribute === "filled" || window.scrollY > 120 ? (isHovering ? "#016789" : "#444") : "#FFFFFF";
      dropdownTrigger.style.color = color;
    }
  }
});
