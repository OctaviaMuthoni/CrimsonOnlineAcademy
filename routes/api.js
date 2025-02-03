const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

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

// API route to fetch testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await readJSON(path.join(__dirname, "../data/testimonials.json"));
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: "Error loading testimonials" });
  }
});

// API route to fetch courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await readJSON(path.join(__dirname, "../data/courses.json"));
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error loading courses" });
  }
});

module.exports = router;
