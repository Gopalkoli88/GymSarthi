const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema(
  {
    /*
    ! admin crete karega trainer and trainer k login  ye info user me he hogi to trainer login kese ;
! i think trainer connected to user and trainer database it self
! research karna padega :
*/
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, sparse: true },
    password: { type: String, required: true },
    expertise: { type: String, required: true },
    experience: { type: String, require: true },
    specializations: [{ type: String }], // e.g., ["Yoga", "Spin"]
    assignedMembers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      { unique: true },
    ],
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    salary: { type: Number },
    status: { type: String, default: "Active" },
    lastLogin: { type: Date, default: Date.now }, // Track last login
    photoUrl: { type: String },
    availability: [{
      day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      startTime: { type: String }, // e.g., "09:00"
      endTime: { type: String }   // e.g., "17:00"
    }],
    // Members the trainer is training
  },
  { timestamps: true },
  { versionKey: false }
);

// Pre-save hook to ensure assignedMembers array contains unique values
TrainerSchema.pre("save", function (next) {
  this.assignedMembers = Array.from(
    new Set(this.assignedMembers.map(String))
  ).map((id) => new mongoose.Types.ObjectId(id));

  if (!this.isNew && this.email === "") {
    this.email = undefined; // Or keep it empty, based on your logic
  }

  next();
});

module.exports = mongoose.model("Trainer", TrainerSchema);
