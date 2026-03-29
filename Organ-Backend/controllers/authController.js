import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, bloodType, medicalHistory } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, bloodType, medicalHistory },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET USER BY ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
