const crypto = require("crypto");
const User = require("../models/UserModel");

exports.findUser = ({ username }) => {
  User.findOne({ username: username })
    .then((data) => {
      //   res.status(200).send(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      //   res.status(500).send({ message: "An error occured." });
      return null;
    });
};

exports.validatePassword = (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
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