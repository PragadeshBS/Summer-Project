const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  dept: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  participatedEvents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
  },
  organizedEvents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
  },
});

userSchema.statics.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
