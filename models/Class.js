const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true // e.g., "Yoga"
  },
  dateTime: { 
    type: Date, 
    required: true // e.g., "2025-03-05T18:00:00Z"
  },
  duration: { 
    type: Number, 
    required: true, 
    min: 15 // minutes, e.g., 60
  },
  trainerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trainer', 
    required: true 
  },
  location: { 
    type: String, 
    required: true, 
    trim: true // e.g., "Room 1"
  },
  maxCapacity: { 
    type: Number, 
    required: true, 
    min: 1 // e.g., 15
  },
  bookings: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Members booked
  }],
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Class', ClassSchema);