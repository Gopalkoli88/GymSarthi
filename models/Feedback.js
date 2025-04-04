const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    default: null,
  },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", default: null },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userName: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
