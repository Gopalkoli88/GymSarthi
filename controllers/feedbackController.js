const Feedback = require("../models/Feedback");
const User = require("../models/User");
// Submit feedback
const submitFeedback = async (req, res) => {
  const { userName, content } = req.body;

  
  try {
    const feedback = await Feedback.create({ userName, content });
    res.status(200).json({
      status: "success",
      data: {
        feedback,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      message: error.message,
    });
  }
};

// Get feedback for a specific user
const getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user.id });
    res.status(200).json({
      status: "success",
      results: feedback.length,
      data: {
        feedback,
      },
    });
  } catch (error) {
    console.log("Error from getUserFeedback", error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get feedback for a specific trainer
const getTrainerFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ trainer: req.user.id });
    res.status(200).json({
      status: "success",
      results: feedback.length,
      data: {
        feedback,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get feedback for a specific plan
const getPlanFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    const userId = await User.findById(feedback.user);
    feedback.userName = userId.name;

    feedback.save();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  getPlanFeedback,
  getTrainerFeedback,
  getUserFeedback,
  submitFeedback,
};
