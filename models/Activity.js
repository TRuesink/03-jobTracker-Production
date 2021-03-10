const mongoose = require("mongoose");

const { Schema } = mongoose;

const activitySchema = new Schema({
  description: { type: String, required: true },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: "Contact",
    required: false,
  },
  opportunity: {
    type: mongoose.Schema.ObjectId,
    ref: "Opportunity",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  script: {
    type: mongoose.Schema.ObjectId,
    ref: "Script",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const activityClass = mongoose.model("Activity", activitySchema);

module.exports = activityClass;
