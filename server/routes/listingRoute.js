const router = require("express").Router();

const listingControlelr = require("../controllers/listingController");

router
  .route("/")
  .post(listingControlelr.saveListing)
  .get(listingControlelr.getListings);
router.route("/:id").get(listingControlelr.getOneListing);
router.route("/user/:username").get(listingControlelr.getListingsForUser);

module.exports = router;
