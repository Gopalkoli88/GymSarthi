const mongoose = require("mongoose");



const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,      ref: "Plan",
      required: true,
    },
    planName: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "upi"],
      required: true,
    },
    amount: { type: Number, required: false },
    paymentDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      default: "pending",
    },
    paymentDetails: {
      cardNumber: { type: String },
      expirationDate: { type: String },
      cvv: { type: String },
      transactionId: { type: String }, // to store transaction ID from payment gateway
      paymentGateway: { type: String }, // to store the name of the payment gateway used
    },
 
   },
  { timestamps: true }
);

PaymentSchema.index({ userId: 1, planId: 1 }, { unique: true });

module.exports = mongoose.model("Payment", PaymentSchema);
