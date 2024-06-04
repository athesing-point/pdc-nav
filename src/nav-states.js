window.onload = function () {
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
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"), // The lines in the menu icon with white-icon class
  };

  // Check if the navbar component exists
  if (!elements.navbarComponent) {
    console.log("No Nav Found.");
    return;
  }

  // Set the navbar opacity to 1
  elements.navbarComponent.style.opacity = "1";

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
  // // Function to handle button hovers
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

  // Store references to the event listener functions
  let primaryBtnHoverFuncs, secondaryBtnHoverFuncs;

  // Define the buttons and their hover states immediately after they are defined
  if (elements.navbarAttribute === "filled" || window.scrollY > 120) {
    setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "#F4C65D", color: "#444" });
    setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "#F6F7F9", color: "#444" });
    primaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnPrimary, "#f1b937", "#F4C65D");
    secondaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnSecondary, "#ebebeb", "#F6F7F9");
  } else {
    setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "transparent", color: "#FFFFFF" });
    setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "transparent", color: "#FFFFFF" });
    primaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnPrimary, "rgba(255,255,255,0.06)", "transparent");
    secondaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnSecondary, "rgba(255,255,255,0.06)", "transparent");
  }

  // Check the navbar attribute
  // If it is 'filled', apply certain styles to the elements
  // If it is not 'filled', add a scroll event listener to apply styles based on the scroll position
  if (elements.navbarAttribute === "filled" || window.scrollY > 120) {
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
      primaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnPrimary, "#f1b937", "#F4C65D");
      secondaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnSecondary, "#ebebeb", "#F6F7F9");
      elements.menuIconLines.forEach((element) => {
        setElementStyle(element, { backgroundColor: "#444" });
      });
    } else if (window.scrollY <= 119 && elements.navbarAttribute !== "filled") {
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
      setElementStyle(elements.navbarBtnPrimary, { backgroundColor: "transparent", color: "#FFFFFF" });
      setElementStyle(elements.navbarBtnSecondary, { backgroundColor: "transparent", color: "#FFFFFF" });
      elements.menuIconLines.forEach((element) => {
        setElementStyle(element, { backgroundColor: "" });
      });
      elements.navbarBtnPrimary.style.backgroundColor = "";
      elements.navbarBtnSecondary.style.backgroundColor = "";
      elements.navbarBtnPrimary.removeEventListener("mouseover", primaryBtnHoverFuncs.mouseoverFunc);
      elements.navbarBtnPrimary.removeEventListener("mouseout", primaryBtnHoverFuncs.mouseoutFunc);
      elements.navbarBtnSecondary.removeEventListener("mouseover", secondaryBtnHoverFuncs.mouseoverFunc);
      elements.navbarBtnSecondary.removeEventListener("mouseout", secondaryBtnHoverFuncs.mouseoutFunc);
    } // Add mouseover and mouseout event listeners to each dropdown card
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
  });

  //Logic for handling the addition of the toast.

  // Select the .nav-toast element
  const navToast = document.querySelector(".nav-toast");

  if (!navToast) {
    console.log("No toast found.");
  } else {
    // Set the transition property for smooth movement and opacity change
    navToast.style.transition = "opacity 0.5s ease-in-out";
    navToast.style.opacity = 1;

    // Function to handle scroll events
    function handleScroll() {
      if (window.scrollY > 100) {
        // Adjust this value based on when you want the toast to move
        navToast.style.marginTop = "-3rem";
      } else {
        navToast.style.marginTop = "0";
      }
    }

    // Initialize the toast position based on the current scroll position
    handleScroll(); // Call handleScroll immediately to set the initial position

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Set initial position of the toast based on the current scroll position without waiting for a scroll event
    // This ensures the correct position is set even if the page is refreshed while scrolled down
    if (window.scrollY > 100) {
      navToast.style.marginTop = "-3rem";
      // document.querySelector(".navbar_component_updated").style.marginTop = "-3rem";
      // Disable transitions initially to avoid the fade/move effect on load
      document.querySelector(".navbar_component_updated").style.transition = "opacity 0.3s ease-in-out";
      document.querySelector(".nav-toast").style.transition = "opacity 0.3s ease-in-out";
    } else {
      navToast.style.marginTop = "0";
    }

    // Re-enable transitions after the initial setup
    setTimeout(() => {
      document.querySelector(".navbar_component_updated").style.transition = "opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out";
      document.querySelector(".nav-toast").style.transition = "opacity 0.3s ease-in-out, margin-top 0.3s ease-in-out";
    }, 0);
  }
};
