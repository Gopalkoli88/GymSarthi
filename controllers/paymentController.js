const { check, validationResult } = require("express-validator");
const Payment = require("../models/Payment");
const Plan = require("../models/Plan");
const User = require("../models/User");
const {sendConfirmationEmail,sendEmail} = require("../utils/emailService");
const Trainer = require("../models/Trainer");
const PartialPaymentSchema=require("../models/PartialPaymentSchema");

// ------------------------------------------------------------------------------------------------




// ------------------------------------------------------------------------------------------------

// validation middleware on plan purchase details :
const validatePlanPurchase = [
  check("planId")
    .notEmpty()
    .withMessage("Plan ID is required")
    .isMongoId()
    .withMessage("Invalid Plan ID"),
  check("paymentMethod").notEmpty().withMessage("Payment method is required"),
  check("paymentDetails.cardNumber")
    .isLength({ min: 16, max: 16 })
    .withMessage("Card number must be 16 digits"),
  check("paymentDetails.expirationDate")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .withMessage("Expiry date must be in MM/YY format"),
  check("paymentDetails.cvv")
    .isLength({ min: 3, max: 4 })
    .withMessage("CVC must be 3 or 4 digits"),
  check("paymentDetails.name")
    .notEmpty()
    .withMessage("Name on card is required"),
  check("paymentDetails.zip")
    .isLength({ min: 5, max: 5 })
    .withMessage("Zip code must be 5 digits"),
];
 
const planPurchase = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { planId, amount, paymentMethod, paymentDetails } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("payments");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currentDate = new Date();
    const paymentAmount = Number(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid payment amount" });
    }

    let plan, planFee, expiryDate;

    // Check if this is a new plan purchase or a remaining payment
    if (planId) {
      // New plan purchase
      plan = await Plan.findById(planId);
      if (!plan) {
        return res.status(404).json({ success: false, message: "Plan not found" });
      }
      planFee = Number(plan.price);
      if (isNaN(planFee) || planFee <= 0) {
        return res.status(400).json({ success: false, message: "Invalid plan price" });
      }

      // Check if user has an active plan
      if (user.isActive && user.planExpiry && currentDate < user.planExpiry) {
        const latestPayment = user.payments[user.payments.length - 1];
        if (latestPayment && latestPayment.remainingAmount > 0) {
          return res.status(400).json({
            success: false,
            message: `You cannot purchase a new plan until you fully pay your current plan (${user.planName}). Remaining balance: ${latestPayment.remainingAmount.toFixed(2)}`,
          });
        }
      }

      expiryDate = new Date(currentDate);
      expiryDate.setDate(currentDate.getDate() + plan.duration);
    } else if (user.isActive && user.planId && user.payments.length > 0) {
      // Remaining payment for existing plan
      plan = await Plan.findById(user.planId);
      if (!plan) {
        return res.status(404).json({ success: false, message: "Current plan not found" });
      }
      planFee = Number(plan.price);
      expiryDate = user.planExpiry;
    } else {
      return res.status(400).json({
        success: false,
        message: "No active plan to pay remaining balance for, and no new plan specified",
      });
    }

    let partialPayment;
    if (!user.payments || user.payments.length === 0) {
      // First payment for a new plan
      if (paymentAmount > planFee) {
        return res.status(400).json({
          success: false,
          message: `Payment amount exceeds plan fee. Total due: ${planFee}`,
        });
      }

      const remainingAmount = planFee - paymentAmount;
      const paymentDeadline = new Date(currentDate);
      paymentDeadline.setDate(currentDate.getDate() + 20);

      partialPayment = new PartialPaymentSchema({
        amountPaid: paymentAmount,
        paymentDate: currentDate,
        remainingAmount: remainingAmount,
        deadline: paymentDeadline,
        status: remainingAmount === 0 ? "completed" : "pending",
      });

      await partialPayment.save();
      user.payments = [partialPayment._id];
      user.isActive = true;
      user.planName = plan.name;
      user.purchaseDate = currentDate;
      user.planExpiry = expiryDate;
      user.planId = planId;
    } else {
      // Payment for existing plan
      const latestPayment = await PartialPaymentSchema.findById(user.payments[user.payments.length - 1]);
      if (!latestPayment) {
        return res.status(500).json({ success: false, message: "Latest payment record not found" });
      }

      if (latestPayment.status === "completed") {
        return res.status(400).json({ success: false, message: "Payment already completed for this plan" });
      }

      if (currentDate > latestPayment.deadline) {
        latestPayment.status = "cancelled";
        user.isActive = false;
        await latestPayment.save();
        await user.save();
        return res.status(400).json({ success: false, message: "Payment deadline exceeded, plan deactivated" });
      }

      const prevRemaining = Number(latestPayment.remainingAmount);
      if (isNaN(prevRemaining)) {
        return res.status(500).json({ success: false, message: "Invalid remaining amount in previous payment" });
      }

      const totalPaid = planFee - prevRemaining + paymentAmount;
      const newRemainingAmount = planFee - totalPaid;

      if (newRemainingAmount < 0) {
        return res.status(400).json({
          success: false,
          message: `Payment amount exceeds remaining balance. Remaining amount due: ${prevRemaining.toFixed(2)}`,
        });
      }

      partialPayment = new PartialPaymentSchema({
        amountPaid: paymentAmount,
        paymentDate: currentDate,
        remainingAmount: newRemainingAmount,
        deadline: latestPayment.deadline,
        status: newRemainingAmount === 0 ? "completed" : "pending",
      });

      await partialPayment.save();
      user.payments.push(partialPayment._id);
    }

    let payment = await Payment.findOne({ userId, planId: planId || user.planId });
    if (!payment && user.payments.length === 1) {
      payment = new Payment({
        userId,
        planId: planId || user.planId,
        planName: plan.name,
        amount: planFee,
        status: paymentAmount === planFee ? "completed" : "pending",
        paymentMethod,
        paymentDetails,
      });
      await payment.save();

      plan.users.push(userId);
      await plan.save();

      const trainer = await Trainer.findById(plan.trainerId);
      if (trainer) {
        trainer.assignedMembers.push(userId);
        try {
          await trainer.save();
        } catch (trainerError) {
          console.log("Trainer save error:", trainerError);
          return res.status(500).json({ success: false, message: "Failed to update trainer", error: trainerError.message });
        }
        user.trainerName = trainer.name;
      }
    } else if (payment && partialPayment.remainingAmount === 0) {
      payment.status = "completed";
      await payment.save();
    }

    await user.save();
    const updatedUser = await User.findById(userId).populate('payments');

    if (user.payments.length === 1 || partialPayment.remainingAmount === 0) {
      try {
        await sendConfirmationEmail(updatedUser, plan);
      } catch (emailError) {
        console.log("Email sending failed:", emailError);
      }
    }

    res.status(200).json({
      success: true,
      message: user.payments.length === 1
        ? "Plan enrolled successfully!"
        : partialPayment.remainingAmount === 0
          ? "Plan fully paid and active!"
          : "Partial payment recorded successfully",
      planExpiry: expiryDate,
      remainingAmount: partialPayment.remainingAmount,
      deadline: partialPayment.deadline,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error from paymentcontroller:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


const getMemberRemainingPaymentStatus=async(req,res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('payments');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const currentDate = new Date();

    // If no payments or no active plan
    if (!user.payments || user.payments.length === 0) {
      const plan = user.planId ? await Plan.findById(user.planId) : null;
      return res.status(200).json({
        success: true,
        planName: user.planName || 'No active plan',
        totalAmount: plan ? plan.price : 0,
        amountPaid: 0,
        remainingAmount: plan ? plan.price : 0,
        deadline: null,
        status: 'pending',
        isActive: user.isActive,
        planExpiry: user.planExpiry,
        paymentHistory: [],
      });
    }

    // Calculate payment details
    const latestPayment = user.payments[user.payments.length - 1];
    const plan = await Plan.findById(user.planId);
    const totalAmount = plan ? plan.price : 0;
    const amountPaid = user.payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
    const remainingAmount = latestPayment.remainingAmount;

    res.status(200).json({
      success: true,
      planName: user.planName,
      totalAmount: totalAmount,
      amountPaid: amountPaid.toFixed(2), // Rounded for display
      remainingAmount: remainingAmount.toFixed(2), // Rounded for display
      deadline: latestPayment.deadline,
      status: latestPayment.status,
      isActive: user.isActive,
      planExpiry: user.planExpiry,
      paymentHistory: user.payments.map(payment => ({
        amountPaid: payment.amountPaid.toFixed(2),
        paymentDate: payment.paymentDate,
        remainingAmount: payment.remainingAmount.toFixed(2),
        status: payment.status,
      })),
    });
  } catch (error) {
    console.log('Error fetching payment status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}


// ye wala admin payment ka hain
const getMemberPaymentDetails = async (req, res) => {
  // Assume you have a middleware that sets req.user
  const userId = req.params.id;

  try {
      // const payment = await Payment.find().limit(100).populate("userId planId");
    const payments = await Payment.find({ userId: userId }).populate("userId").populate("planId");
    // const planInfo = await Plan.findById(payments.planId);

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ye wala member payment ka hain :
const getUserPaymentDetails = async (req, res) => {
  // Assume you have a middleware that sets req.user
  const userId = req.params.id;

  try {
      // const payment = await Payment.find().limit(100).populate("userId planId");
    const payments = await Payment.find({ userId: userId }).populate("");
    const planInfo = await Plan.findById(payments.planId);

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getAllPayments = async (req, res) => {
  try {
    const payment = await Payment.find().populate("userId planId");
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {getMemberRemainingPaymentStatus, getMemberPaymentDetails, planPurchase, getAllPayments,getUserPaymentDetails };
