const Feedback = require("../models/Feedback");
const User = require("../models/User");
// Submit feedback

const submitFeedback = async (req, res) => {
  const { user, content } = req.body;

  try {
    // Create feedback
    const feedback = await Feedback.create({ user, content });

    // Populate user image from User model
    const populatedFeedback = await Feedback.findById(feedback._id).populate(
      "user"
    );

    return res.status(201).json({
      status: "success",
      message: "Feedback submitted successfully!",
      data: {
        feedback: {
          _id: populatedFeedback._id,
          content: populatedFeedback.content,
          createdAt: populatedFeedback.createdAt,
        },
        User: {
          name: populatedFeedback.user.name,
          photoUrl: populatedFeedback.user.photoUrl,
          email: populatedFeedback.user.email,
          role: populatedFeedback.user.role,
        },
      },
    });
  } catch (error) {
    console.error("Feedback submission error:", error.message);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Get feedback where user field is NOT null (i.e., valid users submitted)
const getUserFeedback = async (req, res) => {
  try {
    const populatedFeedback = await Feedback.find({
      user: { $ne: null },
    }).populate("user"); // only fetch name and image of user

    res.status(200).json({
      status: "success",
      results: populatedFeedback.length,
      data: {
        populatedFeedback,
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
