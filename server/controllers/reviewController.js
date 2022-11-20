const Review = require("../models/ReviewModel");

exports.saveReview = (req, res) => {
  const newReview = new Review(req.body.review);
  newReview.save(function (err) {
    if (err) {
      res.status(400).send({ message: "Review could not be stored" });
    } else {
      res.status(200).send({ done: true });
    }
  });
};

exports.getUserReviews = (req, res) => {
  const target = req.params.username;
  Review.find({ target: target })
    .sort({ dateCreated: "desc" })
    .exec(function (err, data) {
      if (!err) {
        console.log(data);
        res.status(200).json(data);
      }
    });
};
