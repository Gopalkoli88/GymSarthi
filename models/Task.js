const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
});
const MemberStatusSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "missed"],
    default: "pending",
  },
});
const TaskSchema = new mongoose.Schema(
  {
    assignedMembers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
      { unique: true },
    ],
    assignedTrainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: false,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    }, // Reference to the Plan
    date: { type: Date, required: true },
    warmupExercises: {  
      type: [ExerciseSchema],
      default: [],
    },
    mainExercises: {
      type: [ExerciseSchema],
      default: [],
    },
    cooldownExercises: {
      type: [ExerciseSchema],
      default: [],
    },
    preWorkoutAdvice: {
      type: String,
      default: "",
    },
    postWorkoutAdvice: {
      type: String,
      default: "",
    },
    dailyHydration: {
      type: String,
      default: "",
    },
    balancedDietAdvice: {
      type: String,
      default: "",
    },

    memberStatuses: [MemberStatusSchema],
  },

  { timestamps: true }
);
// Pre-save hook to ensure assignedMembers array contains unique values
TaskSchema.pre("save", function (next) {
  this.assignedMembers = Array.from(
    new Set(this.assignedMembers.map(String))
  ).map((id) => new mongoose.Types.ObjectId(id));
  next();
});
module.exports = mongoose.model("Task", TaskSchema);
