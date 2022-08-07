const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  ratingVal: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Rating", ratingSchema);
