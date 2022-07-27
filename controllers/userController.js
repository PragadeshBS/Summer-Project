const User = require("../models/userModel");

const getUserDetails = async (req, res) => {
  res.status(200).json(req.user);
};

const getOrganisedEvents = async (req, res) => {
  const user = await User.findById(req.user.id).populate("organizedEvents");
  if (!user) {
    res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user.organizedEvents);
};

const getParticipatedEvents = async (req, res) => {
  const user = await User.findById(req.user.id).populate("participatedEvents");
  if (!user) {
    res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user.participatedEvents);
};

module.exports = {
  getUserDetails,
  getOrganisedEvents,
  getParticipatedEvents,
};
