const router = require("express").Router();

const listingController = require("../controllers/listingController");

router
  .route("/")
  .post(listingController.saveListing)
  .get(listingController.getListings);
router.route("/:id").get(listingController.getOneListing);
router.route("/:id/update").patch(listingController.updateListing);
router.route("/user/:username").get(listingController.getListingsForUser);

module.exports = router;
