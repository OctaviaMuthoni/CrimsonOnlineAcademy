const db = require("../config/db");

// Get user by username
const getUserByUsername = async (username) => {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows.length > 0 ? rows[0] : null;
};

// Get user by ID
const getUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
};


module.exports = { getUserByUsername, getUserById };
