const nodemailer = require("nodemailer");
const Plan = require("../models/Plan");
const Trainer = require("../models/Trainer");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// * generate Invoice :
async function generateInvoice(user, plan, trainerInfo) {
  const html = fs
    .readFileSync(path.join(__dirname, "invoiceTemplate.html"), "utf8")
    .replaceAll("${user.name}", user.name)
    .replaceAll("${user.email}", user.email)
    .replaceAll("${plan.name}", plan.name)
    .replaceAll("${plan.description}", plan.description)
    .replaceAll("${plan.price}", plan.price)
    .replaceAll("${plan.duration}", plan.duration)
    .replaceAll("${trainerInfo.name}", trainerInfo.name)
    .replaceAll("${trainerInfo.email}", trainerInfo.email)
    .replaceAll("${trainerInfo.expertise}", trainerInfo.expertise)
    .replaceAll("${trainerInfo.experience}", trainerInfo.experience);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const buffer = await page.screenshot({ path: "invoice.png", fullPage: true });

  await browser.close();
  return buffer;
}

//* ----------------------------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.ADMIN, // Your email address
    pass: process.env.PASSWORD, // Your email password or app-specific password
  },
});

// function to send email :
// Function to send email
const sendEmail = async (email, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.ADMIN,
      to: email,
      subject,
      text: message,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


const sendConfirmationEmail = async (user, plan) => {
  console.log("trainer id varify :", plan.trainerId);

  // if (!plan.trainerId) {
  //   return res.status(404).json({ error: "trainer not found." });
  // }

  // console.log("Trainer id", findTrainerId.trainerId);
  const trainerInfo = await Trainer.findById(plan.trainerId);
  console.log("Trainer info", trainerInfo);

  const invoiceBuffer = await generateInvoice(user, plan, trainerInfo);

  const mailOptions = {
    from: process.env.ADMIN,
    to: user.email,
    subject: "Plan Purchase Confirmation",
    attachments: [
      {
        filename: "invoice.png",
        content: invoiceBuffer,
        contentType: "image/png",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

module.exports = {sendEmail,sendConfirmationEmail};
