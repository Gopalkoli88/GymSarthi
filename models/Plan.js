const mongoose = require("mongoose");
const { deflateSync } = require("zlib");

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    }, // in days
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    }, // Reference to the Trainer model
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    }, // Plan status

    photoUrl: { type: String },
  },
  { timestamps: true }
);
PlanSchema.pre("save", function (next) {
  this.users = Array.from(new Set(this.users.map(String))).map(
    (id) => new mongoose.Types.ObjectId(id)
  );
  next();
});
module.exports = mongoose.model("Plan", PlanSchema);
