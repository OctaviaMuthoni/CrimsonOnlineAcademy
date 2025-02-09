const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Resources Management - List all resources
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/resources/index", { title: "Manage Resources" });
});

// Add a new resource
router.get("/add", ensureAuthenticated, (req, res) => {
    res.render("admin/resources/form", { title: "Add Resource" });
});

// Edit an existing resource
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/resources/form", { title: "Edit Resource", resourceId: req.params.id });
});

// View resource details
router.get("/view/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/resources/view", { title: "View Resource", resourceId: req.params.id });
});

// Manage resource categories
router.get("/categories", ensureAuthenticated, (req, res) => {
    res.render("admin/resources/categories", { title: "Manage Resource Categories" });
});

module.exports = router;
