const express = require("express");
const {
  createTaskForPlanMembers,
  getTasksForMember,

  updateTaskStatusForMember,
} = require("../controllers/taskController");
const router = express.Router();
const authorizationMiddleware = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");

// Create tasks for all members of a plan (trainer only)
router.post(
  "/plan",
  createTaskForPlanMembers
);

// Get all tasks for a member
router.get("/member/:id",  getTasksForMember);

// Update task status (member only)
router.put(
  "/update-status",
  authMiddleware,
  authorizationMiddleware("member"),
  updateTaskStatusForMember
);

module.exports = router;
