import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      required: true,
    },
    organ: {
      type: String,
      enum: ["Heart", "Lung", "Liver", "Kidney", "Pancreas", "Cornea"],
      required: true,
    },
    urgency: {
      type: String,
      enum: ["critical", "high", "medium", "low"],
      default: "high",
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    medicalHistory: String,
    status: {
      type: String,
      enum: ["pending", "matched", "completed", "expired"],
      default: "pending",
    },
    matchedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Request", requestSchema);
