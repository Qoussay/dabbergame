const router = require("express").Router();

const reviewController = require("../controllers/reviewController");

router.route("/").post(reviewController.saveReview);
router.route("/user/:username").get(reviewController.getUserReviews);

module.exports = router;
