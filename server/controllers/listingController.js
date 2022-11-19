const Mongoose = require("mongoose");
const ListingModel = require("../models/ListingModel");

exports.saveListing = (req, res) => {
  const reqListing = req.body.listing;

  console.log(reqListing);
  const newListing = new ListingModel(reqListing);
  console.log(newListing);

  newListing
    .save()
    .then((data) => {
      console.log("listing created successfully");
      res.status(200).json({ message: "Listing is created successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "An error has occured", error: error });
    });
};

exports.getListings = (req, res) => {
  ListingModel.find({})
    .sort({ dateCreated: "desc" })
    .exec(function (err, data) {
      if (!err) {
        res.status(200).json(data);
      }
    });
};

exports.getOneListing = (req, res) => {
  const listingId = req.params.id;

  ListingModel.findById(listingId, function (err, data) {
    if (!err) {
      res.status(200).json(data);
      console.log(data);
    }
  });
};
