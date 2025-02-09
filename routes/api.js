const express = require("express");
const router = express.Router();

// Import API routes
const notificationsRoutes = require("./api/notifications");

// Use API routes
router.use("/notifications", notificationsRoutes);

module.exports = router;
