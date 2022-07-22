const mongoose = require("mongoose");

const eventImageSchame = mongoose.Schema({
  image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("EventImage", eventImageSchame);
