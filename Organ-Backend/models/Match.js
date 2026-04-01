import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    donorUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    requestUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    compatibilityDetails: {
      bloodTypeMatch: Boolean,
      organMatch: Boolean,
      locationProximity: Number, // 0-100 score
      urgencyFit: Boolean,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    createdBySystem: {
      type: Boolean,
      default: true,
    },
    rejectionReason: String,
  },
  { timestamps: true },
);

export default mongoose.model("Match", matchSchema);
