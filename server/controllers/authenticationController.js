const userController = require("../controllers/userController");

exports.signup = async (req, res) => {
  try {
    await userController.createUser(req.body);
    // console.log(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
};
