const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middleware/auth");

// Payments Management - List all payments
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin/payments/index", { title: "Manage Payments" });
});

// View a specific payment
router.get("/view/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/payments/view", { title: "View Payment", paymentId: req.params.id });
});

// Process a refund
router.get("/refund/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/payments/refund", { title: "Process Refund", paymentId: req.params.id });
});

// Manage payment settings (e.g., gateway configurations)
router.get("/settings", ensureAuthenticated, (req, res) => {
    res.render("admin/payments/settings", { title: "Payment Settings" });
});

module.exports = router;
