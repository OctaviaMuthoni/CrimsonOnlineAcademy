const express = require("express");
const router = express.Router();

const { ensureAdmin, ensureAuthenticated } = require("../middleware/auth");


// Admin Dashboard
router.get("/", ensureAdmin, (req, res) => {
    res.render("admin/dashboard", { title: "Admin Dashboard" });
});

// Courses Management
router.get("/courses", ensureAuthenticated, (req, res) => {
    res.render("admin/courses/index", { title: "Manage Courses" });
});
router.get("/courses/add", ensureAuthenticated, (req, res) => {
    res.render("admin/courses/form", { title: "Add Course" });
});
router.get("/courses/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/courses/form", { title: "Edit Course", courseId: req.params.id });
});

// Users Management
router.get("/users", ensureAuthenticated, (req, res) => {
    res.render("admin/users/index", { title: "Manage Users" });
});
router.get("/users/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/users/form", { title: "Edit User", userId: req.params.id });
});

// Testimonials Management
router.get("/testimonials", ensureAuthenticated, (req, res) => {
    res.render("admin/testimonials/index", { title: "Manage Testimonials" });
});
router.get("/testimonials/add", ensureAuthenticated, (req, res) => {
    res.render("admin/testimonials/form", { title: "Add Testimonial" });
});
router.get("/testimonials/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/testimonials/form", { title: "Edit Testimonial", testimonialId: req.params.id });
});

// Events Management
router.get("/events", ensureAuthenticated, (req, res) => {
    res.render("admin/events/index", { title: "Manage Events" });
});
router.get("/events/add", ensureAuthenticated, (req, res) => {
    res.render("admin/events/form", { title: "Add Event" });
});
router.get("/events/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/events/form", { title: "Edit Event", eventId: req.params.id });
});

module.exports = router;
