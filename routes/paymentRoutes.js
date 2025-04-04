const express = require("express");
const router = express.Router();

const {
  planPurchase,
  getMemberPaymentDetails,
  getAllPayments,
  getUserPaymentDetails,
  getMemberRemainingPaymentStatus,
} = require("../controllers/paymentController");
const authMiddleware = require("../middleware/auth");
const processPayment = require("../middleware/processPayment");
const authorizationMiddleware = require("../middleware/authorization");

router.post("/purchase", authMiddleware, planPurchase);
router.get("/user-payment/:id", getMemberPaymentDetails);
router.get("/member-payment/:id", getUserPaymentDetails);
router.get("/payments", getAllPayments);
router.get("/payment-status",authMiddleware,getMemberRemainingPaymentStatus);
module.exports = router;
