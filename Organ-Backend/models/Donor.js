import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
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
    location: {
      city: String,
      state: String,
      country: String,
    },
    age: Number,
    medicalHistory: String,
    status: {
      type: String,
      enum: ["available", "matched", "completed", "rejected"],
      default: "available",
    },
    matchedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Donor", donorSchema);
