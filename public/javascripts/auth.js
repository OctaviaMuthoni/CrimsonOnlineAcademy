document.addEventListener("DOMContentLoaded", () => {
    const notification = document.querySelector(".notification-message");
  
    if (notification.textContent.trim()) {
      notification.classList.add("show");
  
      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  });
  