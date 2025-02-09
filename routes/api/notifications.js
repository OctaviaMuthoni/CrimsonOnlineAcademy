const express = require("express");
const router = express.Router();
const db = require("../../config/db"); // Assuming you have a DB connection module
const { sendEmail } = require("../../utils/mailer");

// Middleware
const { ensureAdmin, ensureAuthenticated } = require("../../middleware/auth");

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications with filtering
 */

// Get filtered notifications
router.get("/", ensureAuthenticated, async (req, res) => {
    try {
        let { search, status, type, date } = req.query;
        let query = "SELECT * FROM messages WHERE 1=1";
        let params = [];

        if (search) {
            query += " AND (firstname LIKE ? OR lastname LIKE ? OR email LIKE ? OR subject LIKE ?)";
            params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (status) {
            query += " AND status = ?";
            params.push(status);
        }

        if (type) {
            query += " AND message_type = ?";
            params.push(type);
        }

        if (date) {
            query += " AND DATE(created_at) = ?";
            params.push(date);
        }

        const [notifications] = await db.query(query, params);
        res.json({ success: true, notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

/**
 * @route   GET /api/notifications/:id
 * @desc    Get a single notification by ID
 */
router.get("/:id", ensureAdmin, async (req, res) => {
    try {
        const [notification] = await db.execute("SELECT * FROM messages WHERE id = ?", [req.params.id]);

        if (!notification.length) {
            return res.status(404).json({ error: "Notification not found" });
        }

        res.json(notification[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @route   PATCH /api/notifications/:id/status
 * @desc    Update the status of a notification (read, replied, discarded)
 */
router.patch("/:id/status", ensureAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        if (!["unread", "read", "replied", "discarded"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        await db.execute("UPDATE messages SET status = ? WHERE id = ?", [status, req.params.id]);
        res.json({ message: "Status updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


/**
 * @route   POST /api/notifications/:id/reply
 * @desc    Reply to a notification via email
 */
router.post("/:id/reply", ensureAdmin, async (req, res) => {
    try {
        const { replyMessage } = req.body;
        if (!replyMessage) {
            return res.status(400).json({ error: "Reply message is required" });
        }

        const [message] = await db.execute("SELECT * FROM messages WHERE id = ?", [req.params.id]);

        if (!message.length) {
            return res.status(404).json({ error: "Message not found" });
        }

        const { email, subject } = message[0];

        // Send email
        await sendEmail(email, `Re: ${subject}`, replyMessage);

        // Mark as replied
        await db.execute("UPDATE messages SET status = 'replied' WHERE id = ?", [req.params.id]);

        res.json({ message: "Reply sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
