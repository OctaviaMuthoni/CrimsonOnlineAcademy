const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Careers Management - List all job postings
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/careers/index", { title: "Manage Careers" });
});

// Add a new job posting
router.get("/add", ensureAuthenticated, (req, res) => {
    res.render("admin/careers/form", { title: "Add Job Posting" });
});

// Edit an existing job posting
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/careers/form", { title: "Edit Job Posting", jobId: req.params.id });
});

// View job applications (if applicable)
router.get("/applications", ensureAuthenticated, (req, res) => {
    res.render("admin/careers/applications", { title: "Job Applications" });
});

module.exports = router;
