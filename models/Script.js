const mongoose = require("mongoose");

const { Schema } = mongoose;

const scriptSchema = new Schema(
  {
    message: { type: String, required: true },
    recipient: {
      type: String,
      enum: ["talent acquisition", "management", "engineering", "other"],
      required: true,
    },
    purpose: { type: String, required: true },
    mode: {
      type: String,
      enum: ["email", "linkedIn", "other"],
      default: "linkedIn",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reverse populate with activites
scriptSchema.virtual("activities", {
  ref: "Activity",
  localField: "_id",
  foreignField: "script",
  justOne: false,
});

const scriptClass = mongoose.model("Script", scriptSchema);

module.exports = scriptClass;
