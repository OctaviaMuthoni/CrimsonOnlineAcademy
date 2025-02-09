const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../middleware/auth");

// Importing route modules
router.use("/", require("./admin/dashboard"));
router.use("/courses", require("./admin/courses"));
router.use("/enrollment", require("./admin/enrollment"));
router.use("/payments", require("./admin/payments"));
router.use("/resources", require("./admin/resources"));
router.use("/events", require("./admin/events"));
router.use("/careers", require("./admin/careers"));
router.use("/notifications", require("./admin/notifications"));
router.use("/reports", require("./admin/reports"));
router.use("/manage", require("./admin/manage"));

module.exports = router;
