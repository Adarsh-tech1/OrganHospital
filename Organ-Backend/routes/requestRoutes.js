import express from "express";
import { createRequest } from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createRequest);

export default router;
