"use strict";
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const db = require("./db");

const router = express.Router();

// Fake user data for demo (replace with DB query)
const users = [
  {
    id: 1,
    email: "user@example.com",
    passwordHash: "$2b$10$exampleHashedPassword1234567890", // bcrypt hash of password
  },
];

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Columns in table users : username, email, passwordhash, privilege
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }

  // Check if there is a result from the database corresponding to the username
  if (!result[0]) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, result[0].passwordhash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ user: username, email: result[0].email, privilege: result[0].privilege }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
