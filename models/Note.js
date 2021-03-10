const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
  content: { type: String, required: true },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const noteClass = mongoose.model("Note", noteSchema);

module.exports = noteClass;
