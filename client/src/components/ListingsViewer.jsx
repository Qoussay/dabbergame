import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import ListingCard from "./ListingCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Listings({ currentListings }) {
  const navigate = useNavigate();
  return (
    <div className="grid desktop:grid-cols-7 laptop:grid-cols-6 gap-6 py-8">
      {currentListings &&
        currentListings.map((listing) => {
          return (
            <ListingCard
              data={listing}
              key={listing._id}
              onClick={() => navigate(`/listing/${listing._id}`)}
            />
          );
        })}
    </div>
  );
}

export default function ListingsViewer({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentListings, setCurrentListings] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentListings(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  useEffect(() => {
    // Fetch items from another resources.
    async function getData() {
      const res = await axios.get("/api/listings").catch((err) => {
        console.log(err);
      });

      setData(res.data);
    }

    getData();
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div>
      <Listings currentListings={currentListings} />
      {pageCount === 1 ? null : (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-accent text-base"
            />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="text-accent text-base"
            />
          }
          renderOnZeroPageCount={null}
          className="flex flex-row justify-center space-x-5 text-lg"
          pageClassName=" hover:text-xl text-text-medium"
          activeLinkClassName="text-text-white underline decoration-solid underline-offset-4 "
        />
      )}
    </div>
  );
}

// TO-DO:
// modify the Select tag
