import express from "express";
import {
  login,
  register,
  updateProfile,
  getUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", getUser);
router.put("/user/:id", updateProfile);

export default router;
