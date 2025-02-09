const db = require("../config/db");

// Get all courses
const getAllCourses = async () => {
    const [rows] = await db.query("SELECT * FROM courses");
    return rows;
};

// Get a single course by ID
const getCourseById = async (id) => {
    const [rows] = await db.query("SELECT * FROM courses WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = { getAllCourses, getCourseById };
