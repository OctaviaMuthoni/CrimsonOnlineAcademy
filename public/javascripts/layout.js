document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.querySelector(".side-menu");
    const menuItems = document.querySelectorAll(".side-menu .menu-list a");
  
    // Toggle mobile menu visibility
    menuToggle.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
    });
  
    // Toggle text visibility in collapsed side menu
    sideMenu.addEventListener("click", () => {
      sideMenu.classList.toggle("collapsed");
    });
  
    // Smooth scrolling effect for mobile when clicking a menu item
    menuItems.forEach(item => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sideMenu.classList.remove("active");
        }
      });
    });
  });
  