const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middleware/auth");

// Admin Dashboard
router.get("/", ensureAdmin, (req, res) => {
    res.render("admin/dashboard", { title: "Admin Dashboard" });
});

module.exports = router;
