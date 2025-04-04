const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send({ error: 'Authorization header missing' });
  }
  const token = req.header("Authorization").replace("Bearer ", "");

   if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const user = await User.findById(decode.userId);

    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }
console.log("User Info from auth.js",user)
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

 
module.exports = authMiddleware ;
