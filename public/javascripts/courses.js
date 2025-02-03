// fetch("/api/courses")
//       .then(response => response.json())
//       .then(courses => {
//         const container = document.querySelector(".courses-container");
//         courses.forEach(course => {
//           const courseCard = document.createElement("a");
//           courseCard.className = "course-card";
//           courseCard.href = `/courses/${course.id}`;
//           courseCard.innerHTML = `
//             <img src="${course.image}" alt="${course.title}">
//             <div class="course-details">
//               <h3>${course.title}</h3>
//               <p>${course.description}</p>
//               <a class="enroll-btn" href="/enroll">Enroll Now</a>
//             </div>
//           `;
//           container.appendChild(courseCard);
//         });
//       });

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/api/courses");
  const courses = await response.json();

  const container = document.getElementById("courses-container");
  const searchInput = document.getElementById("search");
  const gridViewBtn = document.getElementById("grid-view");
  const detailViewBtn = document.getElementById("detail-view");

  let viewMode = "grid";

  function renderCourses(filter = "") {
      container.innerHTML = "";
      const filteredCourses = courses.filter(course =>
          course.title.toLowerCase().includes(filter.toLowerCase())
      );

      filteredCourses.forEach(course => {
          const courseEl = document.createElement("div");
          courseEl.className = `course-card ${viewMode}`;

          courseEl.innerHTML = `
              <img src="${course.image}" alt="${course.title}">
              <div class="course-info">
                  <h3>${course.title}</h3>
                  <p>${course.description}</p>
              </div>
              <div class="course-meta">
                  <p><strong>Duration:</strong> ${course.period}</p>
                  <p><strong>Price:</strong> ${course.charges}</p>
                  <a href="${course.enroll}" class="enroll-btn">Enroll Now</a>
              </div>
          `;

          container.appendChild(courseEl);
      });
  }

  searchInput.addEventListener("input", () => {
      renderCourses(searchInput.value);
  });

  gridViewBtn.addEventListener("click", () => {
      viewMode = "grid";
      renderCourses(searchInput.value);
  });

  detailViewBtn.addEventListener("click", () => {
      viewMode = "detail";
      renderCourses(searchInput.value);
  });

  renderCourses();
});

