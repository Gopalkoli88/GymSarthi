const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createCanvas } = require("canvas");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const { default: mongoose } = require("mongoose");

const generateProfileImage = async (username) => {
  const firstLetter = username.charAt(0).toUpperCase();
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Set background color
  ctx.fillStyle = "#3498db"; // Example: blue background
  ctx.fillRect(0, 0, 200, 200);

  // Set text color and font
  ctx.fillStyle = "#fff"; // White text
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw the letter in the center of the canvas
  ctx.fillText(firstLetter, 100, 100);

  // // Generate file path and save the image
  // const fileName = `${Date.now()}_profile.png`;
  // const filePath = path.join(__dirname, "..", "uploads", fileName);
  // const buffer = canvas.toBuffer("image/png");
  // fs.writeFileSync(filePath, buffer);

  // // Return the path or URL to be saved in the database
  // return `/uploads/${fileName}`;
  // Generate image buffer
  const buffer = canvas.toBuffer("image/png");

  // Upload the buffer to Cloudinary
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "gym", // Folder to store images in Cloudinary
        public_id: `${username}_profile`, // Optional: create a specific name for the image
      },
      function (error, result) {
        if (error) {
          console.error("Error uploading image to Cloudinary: ", error);
          return reject(error);
        }
        resolve(result.secure_url); // Return the Cloudinary image URL
      }
    );
    uploadStream.end(buffer); // Important to end the stream
  });
};

// signup :
const register = async (req, res) => {
  const { name, email, password, role ,phone} = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const _id = new mongoose.Types.ObjectId();

    // Generate default profile photo based on the first letter of the user's name
    const defaultPhotoUrl = await generateProfileImage(name);
    user = new User({
      _id,
      name,
      email,
      password,
      role,
      phone,
      photoUrl: defaultPhotoUrl,
    });

    await user.save();
    console.log("save data :", user);

    const payload = {
      // id: user.id, -> ye id mongodb wali id hee hain
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = user.generateToken(payload);
    console.log(token);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Internal server error" });
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     console.log("User :", user);
//     if (!user) {
//       return res.status(400).json({ msg: " user not found" });
//     }
//     // const isMatch = await user.comparePassword(password,user);
//     console.log(
//       "user password :",
//       user.password,
//       "current password :",
//       password
//     );
//     const isMatch = await user.comparePassword(password);
//     console.log("isMatch :", isMatch);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Password not Match" });
//     }
//     console.log(user);
//     const payload = {
//       userId: user.id,
//     };

//     const token = user.generateToken(payload);
//     console.log(token);
//     res.status(200).json({ user: user, token: token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };


const login = async (req, res) => {
  const { email, password, googleLogin, picture, name } = req.body;
  
  try {
    let user = await User.findOne({ email });

    if (!user) {
      if (googleLogin) {
        user = new User({
          _id: new mongoose.Types.ObjectId(),
          name, 
          email,
          password: email, // Default password for Google users
          role: "member",
          photoUrl: picture || await generateProfileImage(name || "User"),
        });

        await user.save();
      } else {
        return res.status(400).json({ msg: "User not found" });
      }
    }

    // Debugging logs
    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    if (!googleLogin) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ msg: "Password does not match" });
      }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1y" });

    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
module.exports = {
  register,
  login,
  generateProfileImage,
};
