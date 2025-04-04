const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

const createAdmin = async () => {
  try {
    const checkUser = await User.findOne({ role: "admin" });
    if (checkUser) {
      console.log("Admin already created");
      return;
    }

    const name = "shinchan";
    const role = "admin";
    const email = process.env.ADMIN;
    // hash me datamust be string
    const adminPassword = process.env.PASSWORD;

    if (!adminPassword) {
      throw new Error("Admin password not set in env file");
    }
    // const salt = await bcrypt.genSalt(10);
    // const password = await bcrypt.hash(adminPassword, 10);
    // console.log("hashed from admin file :", password);
    const newId = new mongoose.Types.ObjectId();
    const admin = new Admin({
      _id: newId,
      name: name,
      email: email,
      password: adminPassword,
      role: role,
      contact: "+91 (555) 555-5555",
      gymAddress: "123 Main St, Anytown USA",
      ownerInformation:
        "John Doe has been the owner of Acme Gym since 2015. He has over 10 years of experience in the fitness industry.",
      achievements:
        "Acme Gym has been recognized as the best gym in the city for the past 3 years. John Doe has also been named Fitness Trainer of the Year in 2020.",
      experience:
        "John Doe has over 15 years of experience in the fitness industry, with a focus on strength training and nutrition. He has helped countless clients achieve their fitness goals.",
      sponsors:
        "Acme Gym is currently sponsored by Protein Supplements Inc. and Fitness Apparel Co.",
    });
    const adminUser = new User({
      _id: newId,
      name: name,
      email: email,
      password: adminPassword,
      role: role,
    });

    await admin.save();
    await adminUser.save();
    console.log("admin created: ", admin);
  } catch (error) {
    console.log("Error from admin file :", error);
  }
};

module.exports = createAdmin;
