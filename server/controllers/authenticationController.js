const userController = require("../controllers/userController");
const User = require("../models/UserModel");
const crypto = require("crypto");

exports.signup = async (req, res) => {
  try {
    const user = req.body;
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(user.password, salt, 1000, 64, "sha512")
      .toString("hex");

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      state: user.state,
      username: user.username,
      email: user.email,
      salt: salt,
      hash: hash,
    });

    await newUser.save(function (err) {
      if (err) {
        res.status(400).send({ message: "Email or username is already used" });
      } else {
        res.status(200).send({ done: true });
      }
    });
    // console.log(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).end({ error: error.message, done: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    User.findOne({ username: username }, function (err, user) {
      if (user) {
        if (userController.validatePassword(user, password)) {
          res
            .status(200)
            .json({ user: username, message: "User created succesffuly." });
        } else {
          res
            .status(406)
            .json({ error: "Username and password combination is incorrect." });
        }
      } else {
        res.status(404).json({ error: "User does not exist. Try signing up." });
      }
    });
  } catch (error) {
    // }
    console.error(error);
    res.status(500).end(error.message);
  }
};
