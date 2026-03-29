import Donor from "../models/Donor.js";

// ADD DONOR
export const addDonor = async (req, res) => {
  try {
    const donor = await Donor.create({
      userId: req.user.id,
      ...req.body,
    });

    res.json(donor);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL DONORS
export const getDonors = async (req, res) => {
  const donors = await Donor.find().populate("userId");
  res.json(donors);
};
