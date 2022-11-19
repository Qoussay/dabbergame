const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  user: String,
  state: String,
  gameName: String,
  coverURL: String,
  platform: String,
  price: Number,
  condition: String,
  paymentMethod: String,
  delivery: Boolean,
  trade: Boolean,
  description: String,
});

module.exports = mongoose.model("Listing", listingSchema);
