var express = require('express');
var router = express.Router();

const fs = require("fs");
const path = require("path");

// Function to read JSON files
const readJSON = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading ${filePath}:`, err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Homepage route
router.get("/", async (req, res) => {
  try {
    const testimonialsPath = path.join(__dirname, "../data/testimonials.json");
    const coursesPath = path.join(__dirname, "../data/courses.json");

    const [testimonials, courses] = await Promise.all([
      readJSON(testimonialsPath),
      readJSON(coursesPath),
    ]);

    res.render("index", { testimonials, courses });
  } catch (error) {
    res.status(500).send("Error loading data.");
  }
});

// Offline page
router.get("/offline", (req, res) => {
  res.render("offline");
});

router.get('/community', function(req, res, next) {
  res.render('community', { title: 'Community' });
});

router.get('/careers', function(req, res, next) {
  res.render('careers', { title: 'Careers' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { 
    title: 'About Us', 
    team: [
      { image: '/images/john.jpg', name: 'John Doe', role: 'Founder & CEO' },
      { image: '/images/jane.jpg', name: 'Jane Smith', role: 'Head of Curriculum' },
      { image: '/images/michael.jpg', name: 'Michael Lee', role: 'Lead Instructor' },
      { image: '/images/emily.jpg', name: 'Emily Carter', role: 'AI & Data Science Expert' },
    ] 
  });
});


router.get('/contact_us', function(req, res, next) {
  res.render('contact_us', { title: 'Contact us' });
});

router.get("/courses", async (req, res) => {
  try {
    const coursesPath = path.join(__dirname, "../data/courses.json");

    const courses = await Promise.all([
      readJSON(coursesPath),
    ]);

    res.render("courses", { courses });
  } catch (error) {
    res.status(500).send("Error loading data.");
  }
});

router.get('/resources', function(req, res, next) {
  res.render('resources', { title: 'Resources' });
});

router.get('/team', function(req, res, next) {
  res.render('team', { title: 'Team' });
});

router.get('/enroll', function(req, res, next) {
  res.render('enroll', { title: 'Enroll' });
});

module.exports = router;
