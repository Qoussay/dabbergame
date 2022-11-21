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

exports.getListingsForUser = (req, res) => {
  const username = req.params.username;
  console.log(username);
  ListingModel.find({ user: username })
    .sort({ dateCreated: "desc" })
    .exec(function (err, data) {
      if (!err) {
        console.log(data);
        res.status(200).json(data);
      }
    });
};

exports.updateListing = (req, res) => {
  const newListing = req.body.listing;
  ListingModel.findByIdAndUpdate(
    newListing.id,
    newListing,
    function (err, result) {
      if (!err) {
        console.log(result);
        res.status(200).json(result);
      }
    }
  );
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
