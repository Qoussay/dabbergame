const router = require("express").Router();

const listingControlelr = require("../controllers/listingController");

router.route("/").post(listingControlelr.saveListing);

module.exports = router;
