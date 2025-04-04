const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { validatesSignup, validatesLogin } = require("../middleware/validation");
// Signup Route
router.post("/signup", validatesSignup, register);

// Login Route
router.post("/login", validatesLogin, login);

module.exports = router;
