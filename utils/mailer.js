const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 */
async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: `"Admin Team" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });
        console.log(`Email sent to ${to}`);
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

module.exports = { sendEmail };
