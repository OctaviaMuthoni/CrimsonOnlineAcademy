// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// // Function to read JSON files
// const readJSON = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.error(`Error reading ${filePath}:`, err);
//         reject(err);
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// };

// // API route to fetch testimonials
// router.get("/testimonials", async (req, res) => {
//   try {
//     const testimonials = await readJSON(path.join(__dirname, "../data/testimonials.json"));
//     res.json(testimonials);
//   } catch (error) {
//     res.status(500).json({ error: "Error loading testimonials" });
//   }
// });

// // API route to fetch courses
// router.get("/courses", async (req, res) => {
//   try {
//     const courses = await readJSON(path.join(__dirname, "../data/courses.json"));
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: "Error loading courses" });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../public/javascripts/db'); // Database connection

// Helper function for error handling
const handleError = (res, error) => res.status(500).json({ error: error.message });

// Generic CRUD functions
const createRoutes = (table) => {
    // Get all records
    router.get(`/${table}`, async (req, res) => {
        try {
            const [rows] = await db.query(`SELECT * FROM ${table}`);
            res.json(rows);
        } catch (error) {
            handleError(res, error);
        }
    });

    // Get a record by ID
    router.get(`/${table}/:id`, async (req, res) => {
        try {
            const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
            res.json(rows[0]);
        } catch (error) {
            handleError(res, error);
        }
    });

    // Create a record
    router.post(`/${table}`, async (req, res) => {
        try {
            const [result] = await db.query(`INSERT INTO ${table} SET ?`, req.body);
            res.status(201).json({ id: result.insertId, ...req.body });
        } catch (error) {
            handleError(res, error);
        }
    });

    // Update a record
    router.put(`/${table}/:id`, async (req, res) => {
        try {
            const [result] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [req.body, req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated successfully' });
        } catch (error) {
            handleError(res, error);
        }
    });

    // Delete a record
    router.delete(`/${table}/:id`, async (req, res) => {
        try {
            const [result] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted successfully' });
        } catch (error) {
            handleError(res, error);
        }
    });
};

// Tables to generate routes for
const tables = ['users', 'courses', 'enrollments', 'lessons', 'assessments', 'projects', 'certificates', 'team', 'testimonials', 'careers', 'events'];
tables.forEach(createRoutes);

module.exports = router;
