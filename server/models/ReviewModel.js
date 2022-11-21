const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  source: String,
  target: String,
  message: String,
  rate: Number,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
