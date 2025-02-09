const express = require("express");
const { login, logout } = require("../controllers/authController");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => {
    res.render("auth/login", { title: "Login", message: req.flash("error") });
});

// Handle Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

module.exports = router;
