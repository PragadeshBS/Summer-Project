const Joi = require("joi");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { error } = validate(req.body);
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
    const token = User.generateAuthToken();
    res.status(200).json({ token: token, message: "success" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { login };
