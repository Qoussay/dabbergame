const router = require("express").Router();

const authentication = require("../controllers/authenticationController");

router.route("/").post(authentication.login);

module.exports = router;
