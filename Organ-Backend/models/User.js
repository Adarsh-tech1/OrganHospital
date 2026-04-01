import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["donor", "patient", "admin"],
      default: "patient",
    },
    bloodType: {
      type: String,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      default: "O+",
    },
    age: Number,
    medicalHistory: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
