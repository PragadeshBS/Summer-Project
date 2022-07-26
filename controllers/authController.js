const Joi = require("joi");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { error } = validateSignup(req.body);
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
    res.status(200).json({ email, token: generateToken(user._id) });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({ email: user.email, token: generateToken(user._id) });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const validateSignup = (data) => {
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

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "14d",
  });
};

module.exports = { login, createUser };
