document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const menuToggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const authUser = document.querySelector(".auth-user");
  const userOptions = document.querySelector(".user-options");

  // Toggle sidebar for both small & large screens
  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");

    // Adjust content margin dynamically on large screens
    if (window.innerWidth >= 769) {
      document.querySelector(".content").classList.toggle("expanded");
    }
  });

  // Close button only works on small screens
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      sidebar.classList.remove("active");
      document.querySelector(".content").classList.remove("expanded");
    });
  }

  // Close sidebar when clicking outside it (only on mobile)
  document.addEventListener("click", function (event) {
    if (
      sidebar.classList.contains("active") &&
      !sidebar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      sidebar.classList.remove("active");
      document.querySelector(".content").classList.remove("expanded");
    }
    if (
      !authUser.classList.contains("user-options-invisible") && 
      !authUser.contains(event.target) && 
      !userOptions.contains(event.target)
    ) {
      userOptions.classList.add("user-options-invisible");
      console.log('triggered');
    }
  });

  // Toggle user options dropdown
  authUser.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent immediate close
    userOptions.classList.toggle("user-options-invisible");
    console.log('got-here');
  });

  // Handle resizing for proper sidebar behavior
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 769) {
      sidebar.classList.remove("active"); // Ensure correct state
      document.querySelector(".content").classList.remove("expanded");
    }
  });
});
