const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { userName, regNo, mobile, email, dept } = req.body;
  try {
    const user = await User.create({ userName, regNo, mobile, email, dept });
    return res.json(user);
  } catch (error) {
    const duplicateFields = [];
    if (error.code === 11000) {
      if ("mobile" in error.keyValue) duplicateFields.push("mobile");
      if ("email" in error.keyValue) duplicateFields.push("email");
      if ("regNo" in error.keyValue) duplicateFields.push("regNo");
      res.status(400).json({ reason: "duplicateFields", duplicateFields });
    }
  }
};

const getUserDetails = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }
  res.status(200).json(user);
};

module.exports = {
  createUser,
  getUserDetails,
};
