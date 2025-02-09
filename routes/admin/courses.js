const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Courses Management
router.get("/", (req, res) => {
    res.render("admin/courses/index", { title: "Manage Courses" });
});
router.get("/add", ensureAuthenticated, (req, res) => {
    res.render("admin/courses/form", { title: "Add Course" });
});
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/courses/form", { title: "Edit Course", courseId: req.params.id });
});

module.exports = router;
