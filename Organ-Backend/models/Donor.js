import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bloodGroup: String,
    organ: String,
    location: String,
  },
  { timestamps: true },
);

export default mongoose.model("Donor", donorSchema);
