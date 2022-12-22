const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  state: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  salt: String,
  hash: String,
  phoneNumber: String,
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
