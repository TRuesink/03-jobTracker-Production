const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["talent acquisition", "management", "engineering", "other"],
    },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    touches: { type: Number, default: 0 },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reverse populate with activities
contactSchema.virtual("activities", {
  ref: "Activity",
  localField: "_id",
  foreignField: "contact",
  justOne: false,
});

const contactClass = mongoose.model("Contact", contactSchema);

module.exports = contactClass;
