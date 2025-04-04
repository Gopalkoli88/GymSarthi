const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["member", "trainer", "admin"],
      default: "member",
    },
    planName: {
      type: String,
      default: "",
    },
    trainerName: {
      type: String,
      default: "",
    },
    purchaseDate: {
      type: Date,
      default: "",
    },
    expiryDate: {
      type: Date,
      default: "",
    },
    // following work not above
    planExpiry: { type: Date }, // Store exact date and time
    isActive: { type: Boolean, default: false },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    phone: { type: String }, // 📌 Added phone number field
    photoUrl: {
      type: String,
      required: false,
    },
    attendance: [
      {
        date: { type: String, required: true },
        time: { type: Date, required: true }, // Store the timestamp of attendance marking
      },
    ],
    payments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PartialPaymentSchema" },
    ],
    // ✅ Added OTP Fields
    otp: { type: String, default: null }, // Store OTP
    otpExpiry: { type: Date, default: null },

    membershipStartDate: {
      type: Date,
      default: Date.now,
    },
    bookedSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password") || user.isNew) {
      const salt = await bcrypt.genSalt(10);
      const createHashPassword = await bcrypt.hash(user.password, salt);
      user.password = createHashPassword;
    }
    // Validate membership dates
    if (this.expiryDate && this.expiryDate < this.membershipStartDate) {
      return next(
        new Error("Expiry date cannot be before membership start date")
      );
    }
    if (this.planExpiry && this.planExpiry < this.membershipStartDate) {
      return next(
        new Error("Plan expiry cannot be before membership start date")
      );
    }

    // Ensure isActive aligns with planExpiry (if set)
    if (this.planExpiry && this.planExpiry < Date.now()) {
      this.isActive = false;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(update.password, salt);
      this.getUpdate().password = hash;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

UserSchema.methods.generateToken = function (userData) {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3600000 });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isValid = await bcrypt.compare(candidatePassword, this.password);
    return isValid;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
