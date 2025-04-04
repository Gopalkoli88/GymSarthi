const express = require("express");
const { extendSlot,getUserSlot, createSlot, bookSlot, updateSlotByMember, cancelSlot, deleteSlot, getAvailableSlots, updateSlotByAdmin } = require("../controllers/slotController");
const authMiddleware = require("../middleware/auth");
const { checkRole } = require("../middleware/role");

const router = express.Router();

// Admin Routes

router.get("/available", authMiddleware, getAvailableSlots);
router.get("/my-slot", authMiddleware, getUserSlot);
router.put("/extend", authMiddleware, extendSlot);
router.put("/update/:_id", authMiddleware, checkRole('admin'),updateSlotByAdmin); // done 


router.post("/create", authMiddleware, createSlot);
router.delete("/cancel", authMiddleware, cancelSlot);
router.delete("/:slotId", authMiddleware,checkRole('admin'), deleteSlot);

// Member Routes
router.post("/book", authMiddleware, bookSlot);
router.put("/update", authMiddleware, updateSlotByMember);


module.exports = router;
