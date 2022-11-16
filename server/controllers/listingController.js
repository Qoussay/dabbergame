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
