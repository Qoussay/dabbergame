const router = require("express").Router();

const listingController = require("../controllers/listingController");

router
  .route("/")
  .post(listingController.saveListing)
  .get(listingController.getListings);
router
  .route("/:id")
  .get(listingController.getOneListing)
  .patch(listingController.updateListing)
  .delete(listingController.deleteListing);
router.route("/user/:username").get(listingController.getListingsForUser);

module.exports = router;
