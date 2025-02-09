const express = require("express");
const router = express.Router();

const db = require("../../config/db");

const { ensureAuthenticated } = require("../../middleware/auth");

// Notifications Management - List and Filter Notifications
router.get("/", ensureAuthenticated, async (req, res) => {
    try {
        const { search, type, status, startDate, endDate } = req.query;

        let query = "SELECT * FROM messages WHERE 1=1";
        let params = [];

        if (search) {
            query += " AND (firstname LIKE ? OR lastname LIKE ? OR email LIKE ? OR subject LIKE ?)";
            params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (type) {
            query += " AND message_type = ?";
            params.push(type);
        }

        if (status) {
            query += " AND status = ?";
            params.push(status);
        }

        if (startDate && endDate) {
            query += " AND DATE(created_at) BETWEEN ? AND ?";
            params.push(startDate, endDate);
        }

        query += " ORDER BY created_at DESC";

        const [notifications] = await db.query(query, params);

        // If it's an AJAX request, return JSON instead of rendering a page
        if (req.xhr) {
            return res.json({ notifications });
        }

        res.render("admin/notifications/index", { 
            title: "Manage Notifications",
            notifications,
            filters: { search, type, status, startDate, endDate }
        });
    } catch (err) {
        console.error("Error fetching notifications:", err);
        res.render("admin/notifications/index", { 
            title: "Manage Notifications",
            notifications: [],
            error: "Failed to fetch notifications."
        });
    }
});

// Add a new notification
router.get("/add", ensureAuthenticated, (req, res) => {
    res.render("admin/notifications/form", { title: "Add Notification" });
});

// Edit an existing notification
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/notifications/form", { title: "Edit Notification", notificationId: req.params.id });
});

// View notification details
router.get("/view/:id", ensureAuthenticated, (req, res) => {
    res.render("admin/notifications/view", { title: "View Notification", notificationId: req.params.id });
});

// Manage notification settings (e.g., email/SMS preferences)
router.get("/settings", ensureAuthenticated, (req, res) => {
    res.render("admin/notifications/settings", { title: "Notification Settings" });
});

module.exports = router;
