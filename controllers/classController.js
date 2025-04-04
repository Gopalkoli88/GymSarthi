const Class=require("../models/Class");
const Trainer=require("../models/Trainer");
const { sendEmail } = require("../utils/emailService");

require("dotenv").config();
const nodemailer = require("nodemailer");


// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN, // Your Gmail email
    pass: process.env.PASSWORD, // Your Gmail App Password
  },
});
// create class for class schedule
// add authMiddleware, checkRole('admin')
const createClass = async (req, res) => {
  const { name, dateTime, duration, trainerId, location, maxCapacity } =
    req.body;

  try {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer)
      return res
        .status(404)
        .json({ success: false, message: "Trainer not found" });

    const startTime = new Date(dateTime);
    const endTime = new Date(startTime.getTime() + duration * 60000);
    const conflictingClass = await Class.findOne({
      trainerId,
      dateTime: { $lt: endTime },
      $expr: {
        $gt: [
          { $add: ["$dateTime", { $multiply: ["$duration", 60000] }] },
          startTime,
        ],
      },
    });
    if (conflictingClass) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Trainer already scheduled at this time",
        });
    }

    const newClass = new Class({
      name,
      dateTime,
      duration,
      trainerId,
      location,
      maxCapacity,
    });
    await newClass.save();
    // Add notification logic here later (e.g., WhatsApp to trainer)
    // Notify trainer
    // await sendEmail(
    //     trainer.email,
    //     `New Class Assignment: ${name}`,
    //     `You’ve been assigned to teach ${name} on ${new Date(dateTime).toLocaleString()} at ${location}.`
    //   );
  
      // Notify all active members
      const activeMembers = await User.find({ isActive: true });
      const memberEmails = activeMembers.map(member => member.email);
      await Promise.all(
        memberEmails.map(email =>
          // sendEmail(
          //   email,
          //   `New Class Available: ${name}`,
          //   `A new class, ${name}, has been scheduled on ${new Date(dateTime).toLocaleString()} at ${location} with ${trainer.name}. Book now if interested!`
          // )

           transporter.sendMail({
            from :process.env.ADMIN,
             to: email,
             subject:  `New Class Available: ${name}`,
               text : `A new class, ${name}, has been scheduled on ${new Date(dateTime).toLocaleString()} at ${location} with ${trainer.name}. Book now if interested!`
            
          })
        )
      );
    res.status(201).json({ success: true, class: newClass });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// fatch all classes : admins see all, member see future
// add authMiddleware
const getAllClasses=async(req,res)=>{
    try {
        const isAdmin = req.user.role === 'admin';
        const currentDate = new Date();
        const query = isAdmin ? {} : { dateTime: { $gte: currentDate }, status: 'scheduled' };
        const classes = await Class.find(query).populate('trainerId', 'name').lean();
    
        if (!isAdmin) {
          classes.forEach(cls => {
            cls.isBooked = cls.bookings.includes(req.user.id);
            cls.spotsLeft = cls.maxCapacity - cls.bookings.length;
          });
        }
    
        res.status(200).json({ success: true, classes });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
}


// member : book a class :
// add authMiddleware, checkRole('member')
const memberBookClass=async(req,res)=>{
    try {
        const classId = req.params.id;
        const userId = req.user.id;
        const cls = await Class.findById(classId);
        if (!cls || cls.status !== 'scheduled') return res.status(404).json({ success: false, message: 'Class not found or not available' });
        if (cls.bookings.length >= cls.maxCapacity) return res.status(400).json({ success: false, message: 'Class is fully booked' });
        if (cls.bookings.includes(userId)) return res.status(400).json({ success: false, message: 'You’ve already booked this class' });
        if (new Date(cls.dateTime) < new Date()) return res.status(400).json({ success: false, message: 'Class has already started' });
    
        cls.bookings.push(userId);
        await cls.save();
        const user = await User.findById(userId);
    const trainer = await Trainer.findById(cls.trainerId);
    await sendEmail(
      user.email,
      `Class Booking Confirmed: ${cls.name}`,
      `Your booking for ${cls.name} on ${new Date(cls.dateTime).toLocaleString()} with ${trainer.name} at ${cls.location} is confirmed. Get ready for the class!`
    );
        res.status(200).json({ success: true, message: 'Class booked successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
}

// Trainer view schedule :
const getTrainerScheduleClass=async( req,res)=>{
    try {
        const trainerId = req.user.id;
        const classes = await Class.find({ trainerId, dateTime: { $gte: new Date() } }).lean();
        res.status(200).json({ success: true, classes });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
}

// member can cancel a booking class
const classCancelByMember=async(req,res)=>{
    try {
        const classId = req.params.id;
        const userId = req.user.id;
        const cls = await Class.findById(classId);
        if (!cls || cls.status !== 'scheduled') return res.status(404).json({ success: false, message: 'Class not found or not available' });
        if (!cls.bookings.includes(userId)) return res.status(400).json({ success: false, message: 'You haven’t booked this class' });
        if (new Date(cls.dateTime) < new Date()) return res.status(400).json({ success: false, message: 'Class has already started' });
    
        cls.bookings = cls.bookings.filter(id => id.toString() !== userId.toString());
        await cls.save();
        res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
}
module.exports={classCancelByMember,createClass, getAllClasses, memberBookClass, getTrainerScheduleClass};