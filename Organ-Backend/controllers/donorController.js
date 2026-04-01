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

// GET USER DONORS
export const getUserDonors = async (req, res) => {
  const donors = await Donor.find({ userId: req.params.userId }).populate(
    "userId",
  );
  res.json(donors);
};

// GET ALL DONORS (admin/global)
export const getDonors = async (req, res) => {
  const donors = await Donor.find({ status: "available" }).populate("userId");
  res.json(donors);
};
