const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  getMe,
  updateMe,
  getUserDetailsByOnlyAdmin,
  deleteMember,
  getAllUsers,
  getUserTrainerInfo,
  getUserDetails,
  uploadPhoto,
  upload,
  getMembershipGrowth,
  markAttendance,
} = require("../controllers/userController");
const authorizationMiddleware = require("../middleware/authorization");

const multer = require("multer");

// Multer setup (can be moved to adminController)
// const upload = multer({ dest: "uploads/" });

router.get("/userinfo/:id", getUserDetails);
router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);
router.get("/:id", authMiddleware, getUserDetailsByOnlyAdmin);

router.delete("/:id", authMiddleware, deleteMember);
router.get("/", authMiddleware, authorizationMiddleware("admin"), getAllUsers);
router.get("/trainer/:id", getUserTrainerInfo);
router.post("/uploadPhoto/:userId", upload.single("photo"), uploadPhoto);

router.post('/mark-attendance', authMiddleware, markAttendance);


module.exports = router;
