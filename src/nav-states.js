document.addEventListener("DOMContentLoaded", (event) => {
  let navbarAttribute = document.body.getAttribute("navbar-default");
  let navbarComponent = document.querySelector(".navbar_component_updated");
  let logoColorElement = document.querySelector(".logo-color");
  let navDropdownTrigger = document.querySelectorAll(".nav_dropdown_trigger");
  let navbarSingleLink = document.querySelectorAll(".navbar_single_link");

  if (navbarAttribute === "filled") {
    navbarComponent.style.backgroundColor = "#FFFFFF";
    logoColorElement.style.opacity = "1";
    navDropdownTrigger.forEach(element => {
      element.style.color = "#444";
    });
    navbarSingleLink.forEach(element => {
      element.style.color = "#444";
    });
  } else {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 120 && navbarComponent.style.backgroundColor === "transparent") {
        navbarComponent.style.transition = "background-color 0.5s ease-in-out";
        navbarComponent.style.backgroundColor = "#FFFFFF";
        logoColorElement.style.transition = "opacity 0.5s ease-in-out";
        logoColorElement.style.opacity = "1";
        navDropdownTrigger.forEach(element => {
          element.style.color = "#444";
        });
        navbarSingleLink.forEach(element => {
          element.style.color = "#444";
        });
      } else if (window.scrollY <= 120) {
        navbarComponent.style.backgroundColor = "transparent";
        logoColorElement.style.opacity = "0";
        navDropdownTrigger.forEach(element => {
          element.style.color = "";
        });
        navbarSingleLink.forEach(element => {
          element.style.color = "";
        });
      }
    });
  }
});
