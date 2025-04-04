const express = require("express");
const router = express.Router();
const {
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
  getPlanById,
  createPaymentIntent,
  confirmPurchase,
  uploadPlanPhoto,
} = require("../controllers/planController");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// Get all plans
router.get("/", getAllPlans);

// Create a new plan (admin only)
router.post("/", createPlan);

// Update a plan (admin only)
router.put("/:id", updatePlan);

// Delete a plan (admin only)
router.delete("/:id", deletePlan);

router.get("/:id", getPlanById);

router.put("/uploadPhoto/:planId", upload.single("photo"), uploadPlanPhoto);

module.exports = router;
