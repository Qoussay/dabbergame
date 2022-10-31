import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import data from "../mock/listings.json";
import ListingCard from "./ListingCard";

function Listings({ currentListings }) {
  return (
    <div className="grid desktop:grid-cols-7 laptop:grid-cols-6 gap-6 py-8">
      {currentListings.map((listing) => {
        return <ListingCard data={listing} />;
      })}
    </div>
  );
}

export default function ListingsViewer({ itemsPerPage }) {
  console.log(data);
  return (
    <div className="grid desktop:grid-cols-7 laptop:grid-cols-6 gap-6 py-8">
      {data.map((listing) => {
        return <ListingCard data={listing} />;
      })}
    </div>
  );
}

// TO-DO:
// modify the Select tag
