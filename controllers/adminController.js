const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Plan = require("../models/Plan");
const Admin = require("../models/Admin");
const Payment = require("../models/Payment");

require("dotenv").config();

// Admin login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user || user.role !== "admin") {
      return res.status(400).json({ msg: "Admin not found" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // const isMatch = user.password !== password;
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password not match" });
    }

    const payload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "100h",
    });

    res.status(200).json({ user: user, token: token });
  } catch (err) {
     res.status(500).send("Server error", err);
  }
};

// Update admin details
const updateAdmin = async (req, res) => {
  const {
    name,
    email,
    role,
    password,
    contact,
    gymAddress,
    ownerInformation,
    achievements,
    experience,
    sponsors,
  } = req.body;
  try {
    const adminId = req.params.id;
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      {
        name,
        email,
        role,
        password,
        contact,
        gymAddress,
        ownerInformation,
        achievements,
        experience,
        sponsors,
      },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      adminId,
      {
        name,
        email,
        role,
        password,
      },
      { new: true }
    );

     res.status(200).json(admin);
  } catch (err) {
     res.status(500).send("Server error",err);
  }
};

// get admin information api 
const getAdminInfo = async (req, res) => {
  try {
    const adminId = req.params.id;
    const user = await Admin.findById(adminId);
     res.status(200).json(user);
  } catch (error) {
     res.status(401).json({ error: error });
  }
};

// get plan purchased members and non plan purchase members details
const getPurchasedAndNonPurchasedUsers = async (req, res) => {
  try {
    // Step 1: Get all users from the plans collection
    const plans = await Plan.find({}, "users"); // Assuming Plan is your plan collection model
    const purchasedUserIds = plans.reduce((acc, plan) => {
      return acc.concat(plan.users); // Combine all user IDs from different plans
    }, []);

    // Step 2: Fetch details of users who have purchased plans
    const usersWithPlans = await User.find({ _id: { $in: purchasedUserIds } });

    // Step 3: Fetch details of users who have not purchased any plans
    const usersWithoutPlans = await User.find({
      _id: { $nin: purchasedUserIds },
      role: "member",
    });

 
    res.status(200).json({
      usersWithPlans,
      usersWithoutPlans,
    });
  } catch (error) {
     res.status(401).json({ error: error });

  }
};

//  get membership growth every month
const getMembershipGrowthByMonth = async (req, res) => {
  const { year } = req.params; // Extract year from URL parameter

  try {
    const growth = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00Z`),
            $lt: new Date(`${year}-12-31T23:59:59Z`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          count: { $sum: 1 }, // Count users per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    // Fill missing months with zero count
    const months = Array.from({ length: 12 }, (_, i) => ({
      _id: i + 1,
      count: 0,
    }));

    growth.forEach((item) => {
      months[item._id - 1] = item;
    });

    res.json(months);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// every month kitne plan purchase hue
const getPlanPurchasesByMonth = async (req, res) => {
  const { year } = req.params;

  // Ensure the year is a number and in a valid format
  if (!/^\d{4}$/.test(year)) {
    return res
      .status(400)
      .json({ message: "Invalid year format. It should be YYYY." });
  }

  const startDate = new Date(`${year}-01-01T00:00:00Z`);
  const endDate = new Date(`${year}-12-31T23:59:59Z`);

  try {
    const purchases = await Payment.aggregate([
      {
        $match: {
          paymentDate: {
            $gte: startDate,
            $lt: endDate,
          },
          status: "completed", // Only count completed payments
        },
      },
      {
        $group: {
          _id: { $month: "$paymentDate" }, // Group by month
          count: { $sum: 1 }, // Count total number of purchases per month
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    // Fill missing months with zero count
    const months = Array.from({ length: 12 }, (_, i) => ({
      _id: i + 1,
      count: 0,
    }));

    purchases.forEach((item) => {
      months[item._id - 1] = item; // Place the count in the correct month slot
    });

    res.json(months);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get total revenue by month
const getMonthlyRevenue = async (req, res) => {
  try {
    const { year } = req.params; // Get the year from query parameters

    if (!year) {
      return res.status(400).json({ message: "Year parameter is required" });
    }

    // Aggregate query to calculate revenue per month for the specified year
    const revenueData = await Payment.aggregate([
      {
        $match: {
          paymentDate: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${parseInt(year) + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$paymentDate" },
            month: { $month: "$paymentDate" },
          },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } }, // Sort by month
    ]);

    res.json(revenueData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  login,
  updateAdmin,
  getAdminInfo,
  getPurchasedAndNonPurchasedUsers,
  getMembershipGrowthByMonth,
  getPlanPurchasesByMonth,
  getMonthlyRevenue,
};
