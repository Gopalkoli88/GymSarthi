const Trainer = require("../models/Trainer");
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Plan = require("../models/Plan");
const { generateProfileImage } = require("./authController");

// Get all trainers
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find({ status: { $ne: "InActive" } });
    res.status(200).json(trainers);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Get trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({
        status: "fail",
        message: "Trainer not found",
      });
    }
    res.status(200).json(trainer);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Create a new trainer
const createTrainer = async (req, res) => {
  const { name, email, password, expertise, experience, salary } = req.body;
  if (!name || !email || !password || !expertise || !experience) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create user with role 'trainer'
    const defaultPhotoUrl = await  generateProfileImage(name);

    const user = new User({
      _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
      name,
      email,
      password,
      role: "trainer",
      photoUrl: defaultPhotoUrl,
    });
    await user.save();

    // Create trainer
    const trainer = new Trainer({
      _id: user._id, // Use the same _id as the user
      name,
      email,
      password: user.password,
      expertise,
      experience,
      salary,
      photoUrl: defaultPhotoUrl,
    });
    await trainer.save();

    res.status(201).json({ message: user });
  } catch (error) {
    console.log("Error come from trainerController");
    res.status(500).json({ message: error.message });
  }
};

// Update a trainer
const updateTrainer = async (req, res) => {
  try {
    console.log("updated infor req.body :", req.body);
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTrainer) {
      return res.status(404).json({
        status: "fail",
        message: "Trainer not found",
      });
    }
    console.log("updated information from backend :", updatedTrainer);
    res.status(200).json(updatedTrainer);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete a trainer
/*const deleteTrainer = async (req, res) => {
  try {
    const deletedTrainer = await Trainer.findById(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({
        status: "fail",
        message: "Trainer not found",
      });
    }

    const trainerUser = await User.findById(req.params.id);
    if (trainerUser) {
      await User.findByIdAndDelete(req.params.id);
    }
    deletedTrainer.status = "InActive";
    deletedTrainer.email = "";
    // deletedTrainer.save();

    await deletedTrainer.save({ validateBeforeSave: false });

    res.status(204).json({
      status: "success",
      data: deletedTrainer,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
*/
const deleteTrainer = async (req, res) => {
  try {
    // Permanently delete the trainer by ID
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({
        status: "fail",
        message: "Trainer not found",
      });
    }

    // Find and delete the corresponding user if they exist
    const trainerUser = await User.findById(req.params.id);
    if (trainerUser) {
      await User.findByIdAndDelete(req.params.id);
    }

    // Send a success response with no content
    res.status(204).json({
      status: "success",
 message: "Trainer and associated user deleted successfully",
    });
  } catch (err) {
    // Handle errors and send a server error response
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};


const getAllPlansAssociatedWithTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;

    // const plans = await Plan.find({ trainerId: trainerId });
    const trainer = await Trainer.findById(trainerId).populate("plans");

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const planIds = trainer.plans;

    const planPromises = planIds.map((id) => Plan.findById(id));

    const plansDetails = await Promise.all(planPromises);

    res.status(200).json(plansDetails);
  } catch (error) {
    console.log("error from getAllPlansAssociatedWithTrainer ", error);
    res.status(500).json({
      error: error,
      message: "come from getAllPlansAssocatedWithTrainer",
    });
  }
};

module.exports = {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getAllPlansAssociatedWithTrainer,
};
