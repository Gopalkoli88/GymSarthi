const express = require("express");
const router = express.Router();

const {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getAllPlansAssociatedWithTrainer,
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

  updateTrainer
);
router.delete(
  "/:id",
 
  deleteTrainer
);

router.get("/plans/:id", getAllPlansAssociatedWithTrainer);

module.exports = router;
