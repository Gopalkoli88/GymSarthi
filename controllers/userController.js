const User = require("../models/User");
const Trainer = require("../models/Trainer");
const multer = require("multer");
const path = require("path");
// const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const getMe = async (req, res) => {
  try {
    // here i apply authmiddleware who get the token, in that token has user id : and vaha pe pauchi kese hamne daali :
    const user = await User.findById(req.user.id);
    console.log(user);

    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};

const updateMe = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { CloudinaryStorage } = require("multer-storage-cloudinary");
    const cloudinary = require("../config/cloudinaryConfig");
    console.log("update user value :", name);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, password, role },
      { new: true }
    );
    console.log("update user info : ", user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

// get details of user : only admin :
const getUserDetailsByOnlyAdmin = async (req, res) => {
  try {
    //* first check role of user must be Admin :
    const role = req.user.role;
    if (role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    console.log(user);
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};
const getUserDetails = async (req, res) => {
  try {
    //* first check role of user must be Admin :

    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};

const deleteMember = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const id = req.params.id;
    const member = await User.findById(id);
    if (member) {
      await User.findByIdAndDelete(id);
      console.log("deleted successfully");
      res.status(200).json({ deleteMember: member });
    } else {
      return res.status(403).json({ error: "Member not found" });
    }
  } catch (error) {
    console.log("error from userController :", error);
    res.status(401).json({ error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" });
    console.log(users);
    res.status(200).json({
      status: "success",
      results: users.length,
      Users: {
        users,
      },
    });
  } catch (err) {
    console.log("Error from userController getAllUsera api.", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const getUserTrainerInfo = async (req, res) => {
  try {
    const userId = req.params.id;

    const trainer = await Trainer.find({ assignedMembers: userId });

    console.log("find trainer info from getUserTrainerInfo :", trainer);
    if (!trainer) {
      return res
        .status(404)
        .json({ message: "Trainer not found for this user" });
    }

    return res.status(200).json(trainer);
  } catch (error) {
    console.log("Error fetching trainer data :", error);
    return res
      .status(500)
      .json({ message: "Server error, Please try again later" });
  }
};



// upload image  :
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gym", // Specify folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional: Resize image
  },
});

const upload = multer({ storage: storage });

const uploadPhoto = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Get the file URL from Cloudinary
    const photoUrl = req.file.path; // Cloudinary URL

    // Update the User document with the photo URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photoUrl: photoUrl },
      { new: true }
    );

    const updateTrainer = await Trainer.findByIdAndUpdate(
      userId,
      { photoUrl: photoUrl },
      { new: true }
    );

    if (!updateTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ photoUrl: updatedUser.photoUrl });
  } catch (error) {
    console.log("Error comes from photoUpload error : ", error);
    res.status(500).json({ error: "Server error." });
  }
};


// -------------------

// const markAttendance = async (req, res) => {
//   try {
//     // Get the userId from the token
//     const userId = req.user.id;

//     // Get the date from the request body
//     const { date } = req.body;

//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the user has already marked attendance for the given date
//     const attendanceExists = user.attendance.some(att => att.date === date);
//     if (attendanceExists) {
//       return res.status(400).json({ message: "Attendance already marked for this date" });
//     }

//     // Mark attendance by adding the date and time (current timestamp)
//     user.attendance.push({
//       date,
//       time: new Date()  // Store the current time when attendance is marked
//     });

//     await user.save();

//     return res.status(200).json({
//       message: "Attendance marked successfully",
//       attendance: user.attendance
//     });
//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// -------------------------
// const markAttendance = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { date } = req.body;

//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const attendanceExists = user.attendance.some(att => att.date === date);
//     if (attendanceExists) {
//       return res.status(400).json({ message: "Attendance already marked for this date" });
//     }

//     user.attendance.push({
//       date,
//       time: new Date(),
//     });

//     await user.save();

//     return res.status(200).json({
//       message: "Attendance marked successfully",
//       attendance: user.attendance,
//     });
//   } catch (error) {
//     console.error("Error marking attendance:", error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { markAttendance };
// // ----------------------------------

const markAttendance = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User ID:", req.user.id);

    const userId = req.user.id;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Attendance Before:", user.attendance);

    const attendanceExists = user.attendance.some(att => att.date === date);
    if (attendanceExists) {
      return res.status(400).json({ message: "Attendance already marked for this date" });
    }

    user.attendance.push({
      date,
      time: new Date(),
    });

    await user.save();

    console.log("User Attendance After:", user.attendance);

    return res.status(200).json({
      message: "Attendance marked successfully",
      attendance: user.attendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};




module.exports = {
  getMe,
  updateMe,
  getUserDetailsByOnlyAdmin,
  deleteMember,
  getAllUsers,
  getUserTrainerInfo,
  getUserDetails,
  uploadPhoto,
  upload,
  markAttendance,
};












