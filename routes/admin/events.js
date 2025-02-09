const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Events Management - List all events
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/events/index", { title: "Manage Events" });
});

// Add a new event
router.get("/add", ensureAuthenticated, (req, res) => {
    res.render("admin/events/form", { title: "Add Event" });
});

// Edit an existing event
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/events/form", { title: "Edit Event", eventId: req.params.id });
});

// View event details
router.get("/view/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/events/view", { title: "View Event", eventId: req.params.id });
});

// Manage event registrations
router.get("/registrations", ensureAuthenticated, (req, res) => {
    res.render("admin/events/registrations", { title: "Event Registrations" });
});

module.exports = router;
