const mongoose = require("mongoose");

const { Schema } = mongoose;

const meetingSchema = new Schema({
  topic: { type: String, required: true },
  meetingDate: { type: Date, required: false },
  notes: { type: String, required: false },
  opportunity: {
    type: mongoose.Schema.ObjectId,
    ref: "Opportunity",
    required: false,
  },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: "Contact",
    required: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const meetingClass = mongoose.model("Meeting", meetingSchema);

module.exports = meetingClass;
