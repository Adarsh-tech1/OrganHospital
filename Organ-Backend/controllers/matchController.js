import Match from "../models/Match.js";
import Donor from "../models/Donor.js";
import Request from "../models/Request.js";
import User from "../models/User.js";

// Blood type compatibility matrix
const BLOOD_COMPATIBILITY = {
  "O+": ["O+", "A+", "B+", "AB+"],
  "O-": ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], // Universal donor
  "A+": ["A+", "AB+"],
  "A-": ["A+", "A-", "AB+", "AB-"],
  "B+": ["B+", "AB+"],
  "B-": ["B+", "B-", "AB+", "AB-"],
  "AB+": ["AB+"],
  "AB-": ["AB+", "AB-"],
};

// Calculate distance in km between two locations (simplified)
const calculateLocationProximity = (loc1, loc2) => {
  if (loc1.city === loc2.city) return 100;
  if (loc1.state === loc2.state) return 60;
  if (loc1.country === loc2.country) return 30;
  return 0;
};

// Calculate match score using AI algorithm
const calculateMatchScore = (donor, request) => {
  let score = 0;
  let compatibilityDetails = {
    bloodTypeMatch: false,
    organMatch: false,
    locationProximity: 0,
    urgencyFit: false,
  };

  // 1. Blood Type Match (40 points)
  const donorBlood = donor.bloodGroup;
  const requestBlood = request.bloodGroup;
  const isBloodCompatible =
    BLOOD_COMPATIBILITY[donorBlood]?.includes(requestBlood);
  if (isBloodCompatible) {
    score += 40;
    compatibilityDetails.bloodTypeMatch = true;
  }

  // 2. Organ Match (30 points)
  if (donor.organ.toLowerCase() === request.organ.toLowerCase()) {
    score += 30;
    compatibilityDetails.organMatch = true;
  }

  // 3. Location Proximity (20 points)
  const locationScore = calculateLocationProximity(
    donor.location,
    request.location,
  );
  score += (locationScore / 100) * 20;
  compatibilityDetails.locationProximity = locationScore;

  // 4. Urgency Factor (10 points)
  const urgencyWeights = {
    critical: 10,
    high: 7,
    medium: 4,
    low: 2,
  };
  score += urgencyWeights[request.urgency] || 0;
  compatibilityDetails.urgencyFit =
    request.urgency === "critical" || request.urgency === "high";

  return {
    score: Math.round(score),
    compatibilityDetails,
  };
};

// Find best matches for a request
export const findMatchesForRequest = async (requestId) => {
  try {
    const request = await Request.findById(requestId).populate("userId");

    if (!request) {
      return { message: "Request not found" };
    }

    // Find available donors
    const availableDonors = await Donor.find({
      status: "available",
    }).populate("userId");

    // Calculate match scores
    const matches = [];
    for (const donor of availableDonors) {
      const { score, compatibilityDetails } = calculateMatchScore(
        donor,
        request,
      );

      if (score >= 40) {
        // Only consider matches with score >= 40
        matches.push({
          donor,
          score,
          compatibilityDetails,
        });
      }
    }

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);

    // Create match records in database
    const createdMatches = [];
    for (const matchData of matches) {
      const match = await Match.create({
        donorId: matchData.donor._id,
        requestId: request._id,
        donorUserId: matchData.donor.userId._id,
        requestUserId: request.userId._id,
        matchScore: matchData.score,
        compatibilityDetails: matchData.compatibilityDetails,
        status: "pending",
        createdBySystem: true,
      });

      createdMatches.push(match);
    }

    return {
      message: `Found ${createdMatches.length} potential matches`,
      matches: createdMatches,
    };
  } catch (err) {
    console.error("Find matches error:", err);
    return { message: err.message || "Failed to find matches" };
  }
};

// Auto-match when high compatibility is found
export const autoMatchRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const result = await findMatchesForRequest(requestId);

    // Auto-accept if top match score >= 80
    if (result.matches && result.matches.length > 0) {
      const topMatch = result.matches[0];
      if (topMatch.matchScore >= 80) {
        // Auto-accept the match
        topMatch.status = "accepted";
        await topMatch.save();

        // Update donor and request status
        await Donor.findByIdAndUpdate(topMatch.donorId, {
          status: "matched",
          matchedWith: requestId,
        });

        await Request.findByIdAndUpdate(requestId, {
          status: "matched",
          matchedWith: topMatch.donorId,
        });

        return res.json({
          message: "🎉 Auto-matched! High compatibility found",
          match: topMatch,
          autoMatched: true,
        });
      }
    }

    return res.json({
      message: result.message,
      matches: result.matches,
      autoMatched: false,
    });
  } catch (err) {
    console.error("Auto-match error:", err);
    res.status(500).json({ message: err.message || "Failed to auto-match" });
  }
};

// Get all pending matches
export const getPendingMatches = async (req, res) => {
  try {
    const matches = await Match.find({ status: "pending" })
      .populate("donorId")
      .populate("requestId")
      .populate("donorUserId")
      .populate("requestUserId")
      .sort({ matchScore: -1 });

    res.json({
      message: `Found ${matches.length} pending matches`,
      matches,
    });
  } catch (err) {
    console.error("Get pending matches error:", err);
    res.status(500).json({ message: err.message || "Failed to fetch matches" });
  }
};

// Accept a match
export const acceptMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findByIdAndUpdate(
      matchId,
      { status: "accepted" },
      { new: true },
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Update donor and request status
    await Donor.findByIdAndUpdate(match.donorId, {
      status: "matched",
      matchedWith: match.requestId,
    });

    await Request.findByIdAndUpdate(match.requestId, {
      status: "matched",
      matchedWith: match.donorId,
    });

    return res.json({
      message: "✅ Match accepted successfully",
      match,
    });
  } catch (err) {
    console.error("Accept match error:", err);
    res.status(500).json({ message: err.message || "Failed to accept match" });
  }
};

// Reject a match
export const rejectMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { reason } = req.body;

    const match = await Match.findByIdAndUpdate(
      matchId,
      { status: "rejected", rejectionReason: reason },
      { new: true },
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    return res.json({
      message: "❌ Match rejected",
      match,
    });
  } catch (err) {
    console.error("Reject match error:", err);
    res.status(500).json({ message: err.message || "Failed to reject match" });
  }
};

// Complete a match
export const completeMatch = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findByIdAndUpdate(
      matchId,
      { status: "completed" },
      { new: true },
    );

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Update donor and request status
    await Donor.findByIdAndUpdate(match.donorId, {
      status: "completed",
    });

    await Request.findByIdAndUpdate(match.requestId, {
      status: "completed",
    });

    return res.json({
      message: "🎉 Match completed successfully",
      match,
    });
  } catch (err) {
    console.error("Complete match error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to complete match" });
  }
};

// Get user's matches
export const getUserMatches = async (req, res) => {
  try {
    const { userId } = req.params;

    const matches = await Match.find({
      $or: [{ donorUserId: userId }, { requestUserId: userId }],
    })
      .populate("donorId")
      .populate("requestId")
      .populate("donorUserId")
      .populate("requestUserId")
      .sort({ createdAt: -1 });

    res.json({
      message: `Found ${matches.length} matches for this user`,
      matches,
    });
  } catch (err) {
    console.error("Get user matches error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch user matches" });
  }
};
