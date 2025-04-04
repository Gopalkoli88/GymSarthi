const express = require("express");
const router = express.Router();

const {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getAllPlansAssociatedWithTrainer,
  updateTrainerAdmin,
} = require("../controllers/trainerController");
const authorizationMiddleware = require("../middleware/authorization");
const authMiddleware = require("../middleware/auth");
const { validatesSignup } = require("../middleware/validation");

router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);
router.post(
  "/",

  createTrainer
);
router.put(
  "/:id",

  updateTrainerAdmin
);
router.delete(
  "/:id",

  deleteTrainer
);

router.get("/plans/:id", getAllPlansAssociatedWithTrainer);

module.exports = router;
