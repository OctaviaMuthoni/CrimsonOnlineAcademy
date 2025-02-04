const express = require("express");
const passport = require("passport");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    message: req.flash("error"),
  });
});

// Handle Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard", // Redirect normal users
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
