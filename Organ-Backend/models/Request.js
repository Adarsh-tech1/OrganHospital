import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bloodGroup: String,
    organ: String,
    urgency: String,
    location: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Request", requestSchema);
