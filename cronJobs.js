// Import required modules
const cron = require("node-cron");
const mongoose = require("mongoose");
const User = require("./models/User");
const {sendEmail}=require("./utils/emailService");
const path = require("path");
const fs = require("fs");

 

// Function to update users and notify them
const updateUserStatusAndNotify = async () => {
  try {
    console.log("⏳ Running cron job...");

    const now = new Date();
    const threeMinutesLater = new Date();
    threeMinutesLater.setMinutes(now.getMinutes() + 3);

    const expiredUsers = await User.find({ planExpiry: { $lte: now }, isActive: true });
    const usersExpiringSoon = await User.find({ planExpiry: { $lte: threeMinutesLater, $gt: now } });

    if (expiredUsers.length > 0) {
      await User.updateMany({ planExpiry: { $lte: now } }, { $set: { isActive: false } });
      console.log(`✅ Updated ${expiredUsers.length} users to inactive.`);
    } else {
      console.log("✅ No expired users found.");
    }
 

   } catch (error) {
    console.error("❌ Error:", error);
  }
};

 
// Load email template
const emailTemplatePath = path.join(__dirname, "email-template.html");
let emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

// Function to check plan expiry
const checkPlanExpiry = async () => {
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);

  const expiringSoonOrExpiredMembers = await User.find({
    $or: [
      { planExpiry: { $lte: threeDaysLater, $gte: today }, isActive: true }, // Expiring soon
      { planExpiry: { $lt: today }, isActive: false }, // Already expired
    ],
  });

  for (const user of expiringSoonOrExpiredMembers) {
    const daysRemaining = Math.ceil(
      (new Date(user.planExpiry) - today) / (1000 * 60 * 60 * 24)
    );

    let subject, customizedTemplate;
    
    if (daysRemaining > 0) {
      subject = "Your Gym Plan is Expiring Soon!";
      customizedTemplate = emailTemplate
        .replace("{{name}}", user.name)
        .replace("{{message}}", `Your gym membership will expire in ${daysRemaining} days. Renew now to continue your workouts!`);
    } else {
      subject = "Your Gym Plan Has Expired!";
      customizedTemplate = emailTemplate
        .replace("{{name}}", user.name)
        .replace("{{message}}", "Your gym membership has expired. Renew now to regain access to gym facilities.");

      // Update user status to inactive
      user.isActive = false;
      await user.save();
    }

    // Send email
    await sendEmail(user.email, subject, customizedTemplate);
  }

  console.log(`Processed ${expiringSoonOrExpiredMembers.length} expiring memberships.`);
};



// run every 30 min
cron.schedule("*/30 * * * *", async () => {
  await updateUserStatusAndNotify();
  await checkPlanExpiry();
});

console.log("⏰ Cron job initialized...");
