const Slot = require("../models/Slot");
const User = require("../models/User");
const {sendEmail} = require("../utils/emailService"); // Assuming you have an email service


const extendSlot = async (req, res) => {
    try {
      console.log("Extending Slot...");
  
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user.bookedSlot) {
        return res.status(400).json({ message: "You don't have a booked slot!" });
      }
  
      // Get Current Slot
      const currentSlot = await Slot.findById(user.bookedSlot);
      if (!currentSlot) {
        return res.status(404).json({ message: "Current slot not found!" });
      }
  
      // Get Next Consecutive Slot
      const nextSlot = await Slot.findOne({ startTime: currentSlot.endTime });
  
      if (!nextSlot) {
        return res.status(400).json({ message: "No next slot available to extend!" });
      }
  
      // Check if Next Slot has Space
      if (nextSlot.bookedMembers.length >= nextSlot.capacity) {
        return res.status(400).json({ message: "Next slot is fully booked!" });
      }
  
      // Extend Slot: Update User & Slot Details
      user.extendedSlot = nextSlot._id; // Store Extended Slot
      await user.save();
  
      nextSlot.bookedMembers.push(userId);
      await nextSlot.save();
  
      res.status(200).json({
        message: "Slot extended successfully!",
        extendedSlot: {
          _id: nextSlot._id,
          startTime: nextSlot.startTime,
          endTime: nextSlot.endTime,
        },
      });
  
    } catch (error) {
      res.status(500).json({ message: "Server error!", error });
    }
  };
  



const getUserSlot = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("bookedSlot");
  
      if (!user.bookedSlot) {
        return res.status(200).json({ message: "You have not booked any slot yet!" });
      }
  
      res.status(200).json({ bookedSlot: user.bookedSlot });
    } catch (error) {
      res.status(500).json({ message: "Server error!", error });
    }
  };
  



const getAvailableSlots = async (req, res) => {
    try {
      const slots = await Slot.find();
      res.status(200).json({ slots });
    } catch (error) {
      res.status(500).json({ message: "Server error!", error });
    }
  };
  

// ✅ 1. Create a slot (Admin Only)
const createSlot = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const { startTime, endTime, maxCapacity } = req.body;
    const newSlot = new Slot({ startTime, endTime, maxCapacity });
    await newSlot.save();

    res.status(201).json({ message: "Slot created successfully!", slot: newSlot });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// ✅ 2. Book a slot (Member)
const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.body;
    const userId = req.user.id;

    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found!" });

    if (slot.bookedMembers.length >= slot.maxCapacity) {
      return res.status(400).json({ message: "Slot is full. Please try another slot!" });
    }

    // Check if user already booked
    const user = await User.findById(userId);
    if (user.bookedSlot) {
      return res.status(400).json({ message: "You already have a booked slot!" });
    }

    // Book slot
    slot.bookedMembers.push(userId);
    user.bookedSlot = slotId;

    await slot.save();
    await user.save();

    // Send email confirmation
    // sendEmail(user.email, "Slot Booking Confirmed", `Your slot from ${slot.startTime} to ${slot.endTime} is confirmed.`); 

    res.status(200).json({ message: "Slot booked successfully!", slot });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// ✅ 3. Extend or Change Slot (Member)
const updateSlotByMember = async (req, res) => {
  try {
    const { slotId, newSlotId } = req.body;
    const userId = req.user.id;

    const oldSlot = await Slot.findById(slotId);
    const newSlot = await Slot.findById(newSlotId);
    if (!oldSlot || !newSlot) return res.status(404).json({ message: "Slot not found!" });

    // Remove user from old slot
    oldSlot.bookedMembers = oldSlot.bookedMembers.filter(id => id.toString() !== userId);
    await oldSlot.save();

    // Add user to new slot if not full
    if (newSlot.bookedMembers.length >= newSlot.maxCapacity) {
      return res.status(400).json({ message: "New slot is full!" });
    }

    newSlot.bookedMembers.push(userId);
    await newSlot.save();

    // Update user booking
    const user = await User.findById(userId);
    user.bookedSlot = newSlotId;
    await user.save();

    // Send email update
    // sendEmail(user.email, "Slot Updated", `Your slot has been updated to ${newSlot.startTime} - ${newSlot.endTime}.`);

    res.status(200).json({ message: "Slot updated successfully!", newSlot });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// ✅ 4. Cancel Slot (Member)
const cancelSlot = async (req, res) => {
  try {
    console.log("Radhe Radhe from cancel slot");
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user.bookedSlot) return res.status(400).json({ message: "You don't have any booked slot!" });

    const slot = await Slot.findById(user.bookedSlot);
    slot.bookedMembers = slot.bookedMembers.filter(id => id.toString() !== userId);
    await slot.save();

    // Remove booking from user
    user.bookedSlot = null;
    await user.save();

    // Send email notification
//  await sendEmail(user.email, "Slot Booking Canceled", "Your slot booking has been canceled.");

    res.status(200).json({ message: "Slot canceled successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// ✅ 5. Delete Slot (Admin)
const deleteSlot = async (req, res) => {
  try {
    // console.log("Radhe Radhe form deleteSlot");
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied!" });
    }

    const { slotId } = req.params;
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found!" });

    await Slot.findByIdAndDelete(slotId);
    res.status(200).json({ message: "Slot deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

// Update slot details
const updateSlotByAdmin = async (req, res) => {
    try {
      const { _id } = req.params;
      const { startTime, endTime, maxCapacity } = req.body;
  
      const slot = await Slot.findById(_id);
      if (!slot) {
        return res.status(404).json({ message: "Slot not found" });
      }
  
      // Update slot fields
      slot.startTime = startTime || slot.startTime;
      slot.endTime = endTime || slot.endTime;
      slot.maxCapacity = maxCapacity || slot.maxCapacity;
  
      await slot.save();
      res.status(200).json({ message: "Slot updated successfully", slot });
    } catch (error) {
      res.status(500).json({ message: "Failed to update slot", error });
    }
  };

module.exports = {extendSlot, getUserSlot, getAvailableSlots, updateSlotByMember,createSlot, bookSlot, updateSlotByAdmin, cancelSlot, deleteSlot };
