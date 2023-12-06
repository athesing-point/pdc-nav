document.addEventListener("DOMContentLoaded", (event) => {
  let navbarAttribute = document.body.getAttribute("navbar-default");
  let navbarComponent = document.querySelector(".navbar_component_updated");
  let logoColorElement = document.querySelector(".logo-color");

  if (navbarAttribute === "filled") {
    navbarComponent.style.backgroundColor = "#FFFFFF";
    logoColorElement.style.opacity = "1";
  } else {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 120 && navbarComponent.style.backgroundColor === "transparent") {
        navbarComponent.style.transition = "background-color 0.5s ease-in-out";
        navbarComponent.style.backgroundColor = "#FFFFFF";
        logoColorElement.style.transition = "opacity 0.5s ease-in-out";
        logoColorElement.style.opacity = "1";
      } else if (window.scrollY <= 120) {
        navbarComponent.style.backgroundColor = "transparent";
        logoColorElement.style.opacity = "0";
      }
    });
  }
});
