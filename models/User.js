const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["basic"], default: "basic" },
  googleId: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userClass = mongoose.model("User", userSchema);

module.exports = userClass;
