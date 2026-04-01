import express from "express";
import {
  createRequest,
  getRequests,
  getUserRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/", getRequests);
router.get("/user/:userId", protect, getUserRequests);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
