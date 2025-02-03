document.addEventListener("DOMContentLoaded", async function () {
    const slider = document.querySelector(".slider");
    const dotsContainer = document.querySelector(".dots-container");
  
    let testimonials = [];
    let currentIndex = 0;
  
    // Fetch testimonials from Express API
    async function fetchTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        testimonials = await response.json();
        renderTestimonials();
        initializeDots();
        showTestimonial(currentIndex);
      } catch (error) {
        console.error("Error loading testimonials:", error);
      }
    }
  
    // Render Testimonials in the slider
    function renderTestimonials() {
      slider.innerHTML = "";
      testimonials.forEach((testimonial, index) => {
        const testimonialDiv = document.createElement("div");
        testimonialDiv.classList.add("testimonial");
        testimonialDiv.dataset.index = index;
        testimonialDiv.innerHTML = `
          <img src="${testimonial.image}" alt="${testimonial.name}" class="avatar">
          <p class="message">${testimonial.message}</p>
          <span class="name">${testimonial.name}</span>
        `;
        slider.appendChild(testimonialDiv);
      });
    }
  
    // Initialize navigation dots
    function initializeDots() {
      dotsContainer.innerHTML = ""; // Clear existing dots
      testimonials.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showTestimonial(index));
        dotsContainer.appendChild(dot);
      });
    }
  
    // Show a specific testimonial
    function showTestimonial(index) {
      currentIndex = index;
      slider.style.transform = `translateX(-${index * 100}%)`;
  
      // Update active dot
      document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
  
    // Auto-slide every 3 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 3000);
  
    // Load testimonials
    fetchTestimonials();
  });
