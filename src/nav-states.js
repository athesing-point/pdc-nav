document.addEventListener("DOMContentLoaded", (event) => {
  let navbarAttribute = document.body.getAttribute("navbar-default");
  let navbarComponent = document.querySelector(".navbar_component_updated");
  let logoColorElement = document.querySelector(".logo-color");
  let logoWhiteElement = document.querySelector(".logo-white");
  let navDropdownTrigger = document.querySelectorAll(".nav_dropdown_trigger");
  let navbarSingleLink = document.querySelectorAll(".navbar_single_link");
  let menuIconLines = document.querySelectorAll(".menu-icon1_line-top, .menu-icon1_line-middle, .menu-icon1_line-bottom");

  if (navbarAttribute === "filled") {
    navbarComponent.style.backgroundColor = "#FFFFFF";
    logoColorElement.style.opacity = "1";
    navDropdownTrigger.forEach((element) => {
      element.style.color = "#444";
      element.addEventListener("mouseover", function() {
        element.style.color = "#016789";
      });
      element.addEventListener("mouseout", function() {
        element.style.color = "#444";
      });
    });
    navbarSingleLink.forEach((element) => {
      element.style.color = "#444";
    });
    menuIconLines.forEach((element) => {
      element.style.backgroundColor = "#444";
    });
  } else {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 120 && navbarComponent.style.backgroundColor === "transparent") {
        navbarComponent.style.transition = "background-color 0.3s ease-in-out";
        navbarComponent.style.backgroundColor = "#FFFFFF";
        logoColorElement.style.transition = "opacity 0.3s ease-in-out";
        logoColorElement.style.opacity = "1";
        navDropdownTrigger.forEach((element) => {
          element.style.color = "#444";
          element.addEventListener("mouseover", function() {
            element.style.color = "#016789";
          });
          element.addEventListener("mouseout", function() {
            element.style.color = "#444";
          });
        });
        navbarSingleLink.forEach((element) => {
          element.style.color = "#444";
        });
        menuIconLines.forEach((element) => {
          element.style.backgroundColor = "#444";
        });
      } else if (window.scrollY <= 120) {
        navbarComponent.style.backgroundColor = "transparent";
        logoColorElement.style.opacity = "0";
        navDropdownTrigger.forEach((element) => {
          element.style.color = "";
        });
        navbarSingleLink.forEach((element) => {
          element.style.color = "";
        });
        menuIconLines.forEach((element) => {
          element.style.backgroundColor = "";
        });
      }
    });
  }
});
