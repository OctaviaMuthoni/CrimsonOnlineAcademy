const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// General Management Dashboard
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/manage/index", { title: "Admin Management" });
});

// Manage roles and permissions
router.get("/roles", ensureAuthenticated, (req, res) => {
    res.render("admin/manage/roles", { title: "Manage Roles & Permissions" });
});

// Manage system settings
router.get("/settings", ensureAuthenticated, (req, res) => {
    res.render("admin/manage/settings", { title: "System Settings" });
});

// Manage site content
router.get("/content", ensureAuthenticated, (req, res) => {
    res.render("admin/manage/content", { title: "Manage Site Content" });
});

// Manage platform analytics
router.get("/analytics", ensureAuthenticated, (req, res) => {
    res.render("admin/manage/analytics", { title: "Platform Analytics" });
});

module.exports = router;
