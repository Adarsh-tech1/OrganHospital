import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["donor", "patient", "admin"],
      default: "patient",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
