const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Reports Dashboard - Overview of reports
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/reports/index", { title: "Reports Dashboard" });
});

// Generate user activity report
router.get("/users", ensureAuthenticated, (req, res) => {
    res.render("admin/reports/users", { title: "User Activity Report" });
});

// Generate course performance report
router.get("/courses", ensureAuthenticated, (req, res) => {
    res.render("admin/reports/courses", { title: "Course Performance Report" });
});

// Generate financial report
router.get("/payments", ensureAuthenticated, (req, res) => {
    res.render("admin/reports/payments", { title: "Financial Report" });
});

// Generate system logs report
router.get("/logs", ensureAuthenticated, (req, res) => {
    res.render("admin/reports/logs", { title: "System Logs Report" });
});

module.exports = router;
