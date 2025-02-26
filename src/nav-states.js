document.addEventListener("DOMContentLoaded", function () {
  // Define all the elements that will be manipulated
  const elements = {
    navbarComponent: document.querySelector(".navbar_component_updated"), // The navbar component
    logoColorElement: document.querySelector(".logo-color"), // The colored logo
    logoWhiteElement: document.querySelector(".logo-white"), // The white logo
    navDropdownTrigger: document.querySelectorAll(".nav_dropdown_trigger"), // The dropdown triggers in the navbar
    navbarSingleLink: document.querySelectorAll(".navbar_single_link"), // The single links in the navbar
    navbarBtnPrimary: document.querySelector(".navbar_btn[navbar-btn='primary']"), // The primary button in the navbar
    navbarBtnSecondary: document.querySelector(".navbar_btn[navbar-btn='secondary']"), // The secondary button in the navbar
    menuIconLines: document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom"), // The lines in the menu icon with white-icon class
    navToast: document.querySelector(".nav-toast"), // The nav-toast element
  };

  // Check if the navbar component exists
  if (!elements.navbarComponent) {
    console.log("No Nav Found.");
    return;
  }

  // Get the navbar attribute from the navbar component
  const navbarAttribute = elements.navbarComponent.getAttribute("navbar-default");

  // Set the navbar opacity to 1
  elements.navbarComponent.style.opacity = "1";

  // Function to set styles for an element
  const setElementStyle = (element, styles) => {
    if (element) {
      Object.assign(element.style, styles);
    }
  };

  // Function to add a hover effect to an element
  const addHoverEffect = (element, hoverColor, mouseoutColor) => {
    if (element) {
      element.addEventListener("mouseover", function () {
        element.style.color = hoverColor;
      });
      element.addEventListener("mouseout", function () {
        element.style.color = mouseoutColor;
      });
    }
  };

  // Function to handle button hovers
  function buttonHoverStates(element, hoverBgColor, originalBgColor) {
    const mouseoverFunc = function () {
      if (element) element.style.backgroundColor = hoverBgColor;
    };
    const mouseoutFunc = function () {
      if (element) element.style.backgroundColor = originalBgColor;
    };
    if (element) {
      element.addEventListener("mouseover", mouseoverFunc);
      element.addEventListener("mouseout", mouseoutFunc);
    }
    return { mouseoverFunc, mouseoutFunc };
  }

  let primaryBtnHoverFuncs, secondaryBtnHoverFuncs;

  // Update the navbar based on scroll position
  function updateNavbarOnScroll() {
    // First, remove any existing hover event listeners
    if (primaryBtnHoverFuncs && secondaryBtnHoverFuncs) {
      elements.navbarBtnPrimary.removeEventListener("mouseover", primaryBtnHoverFuncs.mouseoverFunc);
      elements.navbarBtnPrimary.removeEventListener("mouseout", primaryBtnHoverFuncs.mouseoutFunc);
      elements.navbarBtnSecondary.removeEventListener("mouseover", secondaryBtnHoverFuncs.mouseoverFunc);
      elements.navbarBtnSecondary.removeEventListener("mouseout", secondaryBtnHoverFuncs.mouseoutFunc);
    }

    if (window.scrollY > 64 || navbarAttribute === "filled") {
      // Apply styles for a scrolled-down state
      setElementStyle(elements.navbarComponent, {
        transition: "background-color 0.2s linear",
        backgroundColor: "#FFFFFF",
      });
      setElementStyle(elements.logoColorElement, {
        transition: "opacity 0.2s linear",
        opacity: "1",
      });
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
      setElementStyle(elements.navbarBtnPrimary, {
        backgroundColor: "#F4C65E",
        color: "#444",
      });
      setElementStyle(elements.navbarBtnSecondary, {
        backgroundColor: "#F6F7F9",
        color: "#444",
      });
      primaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnPrimary, "#f1b937", "#F4C65D");
      secondaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnSecondary, "#ebebeb", "#F6F7F9");
      elements.menuIconLines.forEach((element) => {
        setElementStyle(element, { backgroundColor: "#444" });
      });
    } else {
      // Apply styles for a scrolled-up state
      setElementStyle(elements.navbarComponent, {
        backgroundColor: "transparent",
      });
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
      setElementStyle(elements.navbarBtnPrimary, {
        backgroundColor: "transparent",
        color: "#FFFFFF",
      });
      setElementStyle(elements.navbarBtnSecondary, {
        backgroundColor: "transparent",
        color: "#FFFFFF",
      });
      primaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnPrimary, "rgba(255,255,255,0.06)", "transparent");
      secondaryBtnHoverFuncs = buttonHoverStates(elements.navbarBtnSecondary, "rgba(255,255,255,0.06)", "transparent");
      elements.menuIconLines.forEach((element) => {
        setElementStyle(element, { backgroundColor: "" });
      });
    }

    // Toast behavior
    if (elements.navToast) {
      if (window.scrollY > 100) {
        elements.navToast.style.marginTop = "-2.5rem";
      } else {
        elements.navToast.style.marginTop = "0";
      }
    }
  }

  // Call the function immediately to set the initial state
  updateNavbarOnScroll();

  // Add the scroll event listener
  window.addEventListener("scroll", updateNavbarOnScroll);

  // Initialize toast styles on load
  if (elements.navToast) {
    elements.navToast.style.opacity = "1";
    elements.navToast.style.transition = "margin-top 0.2s linear";

    // Set initial position of the toast based on the current scroll position
    if (window.scrollY > 100) {
      elements.navToast.style.marginTop = "-2.5rem";
    } else {
      elements.navToast.style.marginTop = "0";
    }
  }
});

// Toast behavior for directing users to their offer/in-progress application
class ResumeApplicationToast {
  static isVisible = false;
  static prequalDomain = null;

  constructor(prequalDomain = "https://get.point.com") {
    ResumeApplicationToast.prequalDomain = prequalDomain;
    this.init();
  }

  async init() {
    try {
      const data = await ResumeApplicationToast.fetchVisitorData();
      if (data) {
        this.updateToast(data);
      }
    } catch (error) {
      console.error("Error initializing ResumeApplicationToast:", error);
    }
  }

  static async fetchVisitorData() {
    try {
      const url = ResumeApplicationToast.prequalDomain + "/api/v1/visitors";
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error("Error fetching visitor data:", error);
      return null;
    }
  }

  static async fetchRedirectLink() {
    const url = ResumeApplicationToast.prequalDomain + "/api/v2/estimates/resume";
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error("Error fetching redirect link:", error);
      return null;
    }
  }

  updateToast(visitor) {
    if (!visitor) return;

    // Find the toast elements we want to update
    const toastElement = document.querySelector("#toast");
    if (!toastElement) return;

    // Find the links in the toast
    const toastLinks = toastElement.querySelectorAll("a");
    if (!toastLinks || toastLinks.length === 0) return;

    let message = null;
    let actionText = null;

    if (visitor.hasActiveDocket && !visitor.hasActiveApplicantFlow) {
      message = "Looks like you previously started an application";
      actionText = "Check status";
    } else if (visitor.hasActiveDocket) {
      message = "Looks like you previously started an application";
      actionText = "Resume Application";
    } else if (visitor.estimateKey) {
      message = "You have a recently created offer";
      actionText = "View latest offer";
    }

    if (message && actionText) {
      // Update the toast text
      const textElements = toastElement.querySelectorAll(".text-link-soft_underline");
      if (textElements && textElements.length > 0) {
        textElements.forEach((element) => {
          element.textContent = message;
        });
      }

      // Update link destination for all links
      toastLinks.forEach((link) => {
        link.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            const response = await ResumeApplicationToast.fetchRedirectLink();
            if (response && response.url) {
              window.location.assign(response.url);
            } else {
              console.error("No redirect URL received");
              // Fallback to default behavior if no URL is received
              window.location.href = link.getAttribute("href");
            }
          } catch (error) {
            console.error("Error redirecting to application:", error);
            // Fallback to default behavior on error
            window.location.href = link.getAttribute("href");
          }
        });
      });

      ResumeApplicationToast.isVisible = true;
    }
  }
}

// Initialize the ResumeApplicationToast when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const prequalDomain = "https://get.point.com";
  const resumeApplicationToast = new ResumeApplicationToast(prequalDomain);
});
