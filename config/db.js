const mongoose = require("mongoose");
require("dotenv").config();
const initAdmin = require("../utils/initAdmin");

const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      connectTimeoutMS: 10000, // Increase to 10 seconds
      serverSelectionTimeoutMS: 10000, // Increase to 10 seconds
      // ssl: false,
    })
    .catch((err) => {
      setTimeout(connectWithRetry, 5000);
    });
};
// mongoose maintain a default connection object represent mongodb connection
const db = mongoose.connection;

db.on("connected", () => {
  console.log("database connected");
  initAdmin();
});

db.on("error", (error) => {
  console.log("database connection error", error);
  setTimeout(connectWithRetry, 5000);
});

db.on("disconnected", () => {
  console.log("database disconnected");
  setTimeout(connectWithRetry, 5000);
});

connectWithRetry();

module.exports = db;
