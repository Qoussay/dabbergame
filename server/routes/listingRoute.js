const router = require("express").Router();

const listingControlelr = require("../controllers/listingController");

router
  .route("/")
  .post(listingControlelr.saveListing)
  .get(listingControlelr.getListings);
router.route("/:id").get(listingControlelr.getOneListing);

module.exports = router;
