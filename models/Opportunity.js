const mongoose = require("mongoose");

const { Schema } = mongoose;

const opportunitySchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    size: {
      type: String,
      enum: [
        "1-10",
        "11-50",
        "51-100",
        "101-200",
        "201-500",
        "501-1000",
        "1001-5000",
        "5001-10000",
      ],
      required: true,
    },
    industry: {
      type: String,
      enum: [
        "healthcare",
        "finance",
        "internet",
        "insurance",
        "technology",
        "other",
      ],
      required: true,
    },
    location: { type: String, required: true },
    stage: {
      type: String,
      enum: [
        "research",
        "info meeting",
        "screening interview",
        "technical interview",
        "negotiation",
        "won",
        "lost",
      ],
      default: "research",
      required: true,
    },
    active: { type: Boolean, default: true },
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

// Cascade delete courses when a bootcamp is deleted
opportunitySchema.pre("remove", async function (next) {
  console.log(
    `Activities, Notes, Contacts and Meetings being removed from opportunity ${this._id}`
  );
  await this.model("Activity").deleteMany({ opportunity: this._id });
  await this.model("Contact").deleteMany({ opportunity: this._id });
  await this.model("Meeting").deleteMany({ opportunity: this._id });
  await this.model("Note").deleteMany({ opportunity: this._id });
  next();
});

// reverse populate with activites
opportunitySchema.virtual("activities", {
  ref: "Activity",
  localField: "_id",
  foreignField: "opportunity",
  justOne: false,
});

const opportunityClass = mongoose.model("Opportunity", opportunitySchema);

module.exports = opportunityClass;
