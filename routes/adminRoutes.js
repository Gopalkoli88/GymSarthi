const express = require("express");
const router = express.Router();
const { validatesLogin } = require("../middleware/validation");
const {
  login,
  updateAdmin,
  getAdminInfo,
  getPurchasedAndNonPurchasedUsers,
  getMembershipGrowthByMonth,
  getPlanPurchasesByMonth,
  getMonthlyRevenue,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");

router.post("/login", validatesLogin, login);
router.put("/update/:id", updateAdmin);
router.get("/:id", getAdminInfo);
router.get("/", getPurchasedAndNonPurchasedUsers);
router.get("/membership-growth/:year", getMembershipGrowthByMonth);
router.get("/plan-purchases/:year", getPlanPurchasesByMonth);
router.get("/monthly-revenue/:year", getMonthlyRevenue);

module.exports = router;
