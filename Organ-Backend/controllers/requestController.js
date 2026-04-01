import Request from "../models/Request.js";
import Donor from "../models/Donor.js";
import Match from "../models/Match.js";
import { findMatchesForRequest } from "./matchController.js";

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const request = await Request.create({
      userId: req.user.id,
      ...req.body,
    });

    // 🔥 AUTO MATCHING LOGIC
    const matchResult = await findMatchesForRequest(request._id);

    // Auto-accept if top match score >= 80
    let autoMatched = false;
    if (matchResult.matches && matchResult.matches.length > 0) {
      const topMatch = matchResult.matches[0];
      if (topMatch.matchScore >= 80) {
        topMatch.status = "accepted";
        await topMatch.save();

        // Update donor and request status
        await Donor.findByIdAndUpdate(topMatch.donorId, {
          status: "matched",
          matchedWith: request._id,
        });

        await Request.findByIdAndUpdate(request._id, {
          status: "matched",
          matchedWith: topMatch.donorId,
        });

        autoMatched = true;
      }
    }

    res.json({
      message: autoMatched
        ? "🎉 Request created and auto-matched!"
        : "Request created successfully",
      request,
      matches: matchResult.matches || [],
      autoMatched,
    });
  } catch (err) {
    console.error("Create request error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to create request" });
  }
};

// GET USER REQUESTS
export const getUserRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.params.userId })
      .populate("userId")
      .populate("matchedWith");
    res.json(requests);
  } catch (err) {
    console.error("Get user requests error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch requests" });
  }
};

// GET ALL REQUESTS (admin)
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("userId")
      .populate("matchedWith");
    res.json(requests);
  } catch (err) {
    console.error("Get requests error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to fetch requests" });
  }
};

// GET REQUEST BY ID
export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate("userId")
      .populate("matchedWith");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (err) {
    console.error("Get request error:", err);
    res.status(500).json({ message: err.message || "Failed to fetch request" });
  }
};

// UPDATE REQUEST
export const updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("userId");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request updated successfully", request });
  } catch (err) {
    console.error("Update request error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to update request" });
  }
};

// DELETE REQUEST
export const deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Remove related matches
    await Match.deleteMany({ requestId: req.params.id });

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Delete request error:", err);
    res
      .status(500)
      .json({ message: err.message || "Failed to delete request" });
  }
};
