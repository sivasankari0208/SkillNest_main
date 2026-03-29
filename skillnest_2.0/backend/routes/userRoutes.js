const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

// REGISTER — only customer or provider allowed; admin role blocked
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, skill, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    // Admin role cannot be self-assigned via registration
    const assignedRole = role === "provider" ? "provider" : "customer";
    const user = new User({ name, email, password, skill, role: assignedRole });
    await user.save();

    const { password: _, ...safeUser } = user.toObject();
    res.status(201).json({ message: "Registration successful", user: safeUser });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// LOGIN — admin accounts are blocked from logging in
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Block admin accounts from the public login endpoint
    if (user.role === "admin") {
      return res.status(403).json({ message: "Invalid email or password." });
    }

    const { password: _, ...safeUser } = user.toObject();
    res.json({ message: "Login successful", user: safeUser });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET ALL USERS (internal/debug — not exposed in UI)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
