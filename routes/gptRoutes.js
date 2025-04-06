const express = require("express");
const router = express.Router();
const { generatePlan } = require("../controllers/gptController");

router.post("/", generatePlan);

module.exports = router;
