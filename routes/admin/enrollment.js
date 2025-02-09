const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Enrollment Management - List all enrollments
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/enrollment/index", { title: "Manage Enrollments" });
});

// View a specific enrollment
router.get("/view/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/enrollment/view", { title: "View Enrollment", enrollmentId: req.params.id });
});

// Approve an enrollment (Example: Admin approves a student for a course)
router.get("/approve/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/enrollment/approve", { title: "Approve Enrollment", enrollmentId: req.params.id });
});

// Reject an enrollment
router.get("/reject/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/enrollment/reject", { title: "Reject Enrollment", enrollmentId: req.params.id });
});

module.exports = router;
