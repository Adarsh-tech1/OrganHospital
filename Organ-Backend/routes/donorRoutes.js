import express from "express";
import {
  addDonor,
  getDonors,
  getUserDonors,
} from "../controllers/donorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addDonor);
router.get("/", getDonors);
router.get("/user/:userId", protect, getUserDonors);

export default router;
