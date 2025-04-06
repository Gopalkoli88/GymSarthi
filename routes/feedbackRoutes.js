const express = require("express");
const router = express.Router();
const {
  getPlanFeedback,
  getTrainerFeedback,
  getUserFeedback,
  submitFeedback,
} = require("../controllers/feedbackController");
const authorizationMiddleware = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");

router.get("/", getPlanFeedback);
router.post(
  "/",

  submitFeedback
);
router.get("/user", getUserFeedback);
router.get("/trainer", getTrainerFeedback);

module.exports = router;
