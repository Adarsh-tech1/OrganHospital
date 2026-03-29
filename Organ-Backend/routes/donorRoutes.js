import express from "express";
import { addDonor, getDonors } from "../controllers/donorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addDonor);
router.get("/", getDonors);

export default router;
