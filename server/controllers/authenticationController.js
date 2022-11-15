const userController = require("../controllers/userController");
const User = require("../models/UserModel");

exports.signup = async (req, res) => {
  try {
    await userController.createUser(req.body);
    // console.log(req.body);
    res.status(200).send({ done: true, username: req.body.username });
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
            .send({ user: username, message: "User created succesffuly." });
        } else {
          res
            .status(406)
            .send({ error: "Username and password combination is incorrect." });
        }
      } else {
        res.status(404).send({ error: "User does not exist." });
      }
    });
  } catch (error) {
    // }
    console.error(error);
    res.status(500).end(error.message);
  }
};
