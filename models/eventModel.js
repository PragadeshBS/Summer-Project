const mongoose = require("mongoose");
const User = require("./userModel");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventStartDate: {
    type: Date,
    required: true,
  },
  eventEndDate: {
    type: Date,
  },
  venue: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  otherInfo: {
    type: String,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

module.exports = mongoose.model("Event", eventSchema);
