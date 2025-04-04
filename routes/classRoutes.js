const express=require("express");
const authMiddleware = require("../middleware/auth");
const { createClass, getAllClasses, memberBookClass, getTrainerScheduleClass, classCancelByMember } = require("../controllers/classController");
const { checkRole } = require("../middleware/role");
const router=express.Router();




router.post("/admin/classes",authMiddleware,checkRole("admin"),createClass);
router.get("/classes",authMiddleware,getAllClasses);
router.post("/classes/:id/book",authMiddleware,checkRole('member'),memberBookClass);
router.get("/trainer/schedule",authMiddleware,checkRole('trainer'),getTrainerScheduleClass);
router.delete("/classes/:id/book",authMiddleware,checkRole("member", classCancelByMember));
module.exports=router;
