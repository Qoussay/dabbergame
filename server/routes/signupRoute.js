const router = require("express").Router();

const authentication = require("../controllers/authenticationController");

router.route("/").post(authentication.signup);

module.exports = router;
