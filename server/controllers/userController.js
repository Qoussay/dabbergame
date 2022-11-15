const crypto = require("crypto");
const User = require("../models/UserModel");

// exports.findUser = (username) => {
//   User.findOne({ username: username }, function (err, user) {
//     if (!err) return user;
//   });
// };

exports.validatePassword = (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
};

exports.getUserInfo = (req, res) => {
  const username = req.params.username;
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      res.status(500).json({ error: err });
      return;
    } else {
      if (!user) {
        res.status(404).json({ error: "User does not exist." });
      } else {
        res.status(200).json(user);
      }
    }
  });
};

exports.createUser = async (user) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(user.password, salt, 1000, 64, "sha512")
    .toString("hex");
  user = {
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    state: user.state,
    username: user.username,
    email: user.email,
    salt: salt,
    hash: hash,
  };
  const newUser = new User(user);
  // console.log(newUser);
  newUser
    .save()
    .then((data) => {
      console.log("user created successfully");
      return { username: data.username, createdAt: Date.now() };
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};
