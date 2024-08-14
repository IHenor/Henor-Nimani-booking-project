const express = require("express");
const mysql = require("mysql2/promise");

// Create router for bookings
const router = express.Router();

// MySQL pool setup
const pool = mysql.createPool({
  host: "mysql",
  user: "my_user",
  password: "my_password",
  database: "my_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fetch all bookings
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bookings");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch a booking by ID
router.get("/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [
      bookingId,
    ]);
    if (rows.length === 0) {
      return res.status(404).send("Booking not found");
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Insert a new booking
router.post("/", async (req, res) => {
  const { service, doctor_name, start_time, end_time, date } = req.body;
  const insertQuery =
    "INSERT INTO bookings (service, doctor_name, start_time, end_time, date) VALUES (?, ?, ?, ?, ?)";

  try {
    await pool.query(insertQuery, [
      service,
      doctor_name,
      start_time,
      end_time,
      date,
    ]);
    res.status(201).send("Booking inserted successfully");
  } catch (error) {
    console.error("Error inserting booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
