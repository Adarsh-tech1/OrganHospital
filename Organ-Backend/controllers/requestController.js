import Request from "../models/Request.js";
import Donor from "../models/Donor.js";

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const request = await Request.create({
      userId: req.user.id,
      ...req.body,
    });

    // 🔥 MATCHING LOGIC (basic)
    const matchedDonors = await Donor.find({
      bloodGroup: request.bloodGroup,
      organ: request.organ,
      location: request.location,
    });

    res.json({
      request,
      matchedDonors,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
