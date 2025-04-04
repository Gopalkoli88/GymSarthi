const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Make sure this path is correct
const otpEmailTemplate = require("../utils/otpEmailTemplate"); // Use require instead of import

require("dotenv").config();

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN, // Your Gmail email
    pass: process.env.PASSWORD, // Your Gmail App Password
  },
});


// Generate Random 6-Digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 300000; // OTP valid for 5 minutes
    await user.save();
    const emailHTML = otpEmailTemplate(otp); 

    // Send OTP via Email
    await transporter.sendMail({
      from:process.env.ADMIN,
      to: email,
      subject: "Password Reset OTP",
      // text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`,
      html: emailHTML,
    });

    res.json({ message: "OTP sent to your email" ,otp: otp});
 ;

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset Password - Verify OTP & Change Password
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // Hash new password
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     res.json({ message: "Password reset successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password and clear OTP fields
    await User.updateOne(
      { email },
      { $set: { password: hashedPassword, otp: null, otpExpiry: null } }
    );

    res.json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};





module.exports = { forgotPassword, resetPassword };
