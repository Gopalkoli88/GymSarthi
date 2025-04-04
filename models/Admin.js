const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Admin schema
const adminSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    gymAddress: {
      type: String,
      required: true,
    },
    ownerInformation: {
      type: String,
      required: true,
    },
    achievements: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    sponsors: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Admin model from the schema
module.exports = mongoose.model("Admin", adminSchema);
