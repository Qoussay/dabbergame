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
  console.log("this api has been called", username);
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

  await newUser.save(function (err) {
    if (err) {
      const result = {
        done: false,
        error: "Username or Email already in use.",
      };
      console.log(result);
      return result;
    } else {
      const result = {
        done: true,
        username: data.username,
        createdAt: Date.now(),
      };
      return result;
    }
  });
};
