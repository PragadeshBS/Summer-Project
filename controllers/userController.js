const User = require("../models/userModel");

const getUserDetails = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  getUserDetails,
};
