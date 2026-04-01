import express from "express";
import {
  autoMatchRequest,
  getPendingMatches,
  acceptMatch,
  rejectMatch,
  completeMatch,
  getUserMatches,
  findMatchesForRequest,
} from "../controllers/matchController.js";

const router = express.Router();

// Find matches for a specific request
router.post("/find/:requestId", async (req, res) => {
  try {
    const result = await findMatchesForRequest(req.params.requestId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auto-match a request
router.post("/auto-match", autoMatchRequest);

// Get all pending matches
router.get("/pending", getPendingMatches);

// Accept a match
router.put("/accept/:matchId", acceptMatch);

// Reject a match
router.post("/reject/:matchId", rejectMatch);

// Complete a match
router.put("/complete/:matchId", completeMatch);

// Get user's matches
router.get("/user/:userId", getUserMatches);

export default router;
