const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO Users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User registered successfully" });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM Users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, "secretKey", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  });
});

module.exports = router;
