const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { userName, regNo, mobile, email } = req.body;
  const user = await User.create({ userName, regNo, mobile, email });
  return res.json(user);
};

const getUserDetails = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ userName: username });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

module.exports = {
  createUser,
  getUserDetails,
};
