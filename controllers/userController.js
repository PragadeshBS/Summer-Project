const User = require("../models/userModel");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { userName, regNo, mobile, email, dept, password } = req.body;

    // finding duplicates
    let exists = await User.findOne({ email });
    if (exists) {
      console.log(exists);
      return res.status(400).json({ error: "Email already exists" });
    }
    exists = await User.findOne({ mobile });
    if (exists) {
      return res.status(400).json({ error: "Mobile no. already exists" });
    }
    exists = await User.findOne({ regNo });
    if (exists) {
      return res.status(400).json({ error: "Reg. no. already exists" });
    }

    // hash pwd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      userName,
      regNo,
      mobile,
      email,
      dept,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
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

const validate = (data) => {
  const schema = Joi.object({
    userName: Joi.string().required().label("Name"),
    regNo: Joi.string().empty("").label("Register Number"),
    mobile: Joi.string().required().label("Mobile "),
    dept: Joi.string().empty("").label("Department"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    confirmPassword: passwordComplexity().required().label("Confirm Password"),
  });
  return schema.validate(data);
};

module.exports = {
  createUser,
  getUserDetails,
};
