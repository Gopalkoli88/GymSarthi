const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


 const PartialPaymentSchema = new mongoose.Schema({
  amountPaid: { type: Number  },
  paymentDate: { type: Date, default: Date.now },
  remainingAmount: { type: Number,   default:0},
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
});

module.exports =mongoose.model("PartialPaymentSchema", PartialPaymentSchema) ;