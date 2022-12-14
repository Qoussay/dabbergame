import SortAndFilter from "../components/SortAndFilter";
import ListingsViewer from "../components/ListingsViewer";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
export default function ListingsPage() {
  const [searchparams] = useSearchParams();
  const [query, setQuery] = useState([]);

  let params = {};

  for (let entry of searchparams.entries()) {
    switch (entry[0]) {
      case "gameName":
        if (entry[1] !== "") {
          params = { ...params, gameName: entry[1] };
        }
        break;
      case "platform":
        if (entry[1] !== "") {
          params = { ...params, platform: entry[1] };
        }
        break;
      case "state":
        if (entry[1] !== "") {
          params = { ...params, state: entry[1] };
        }
        break;
      case "delivery":
        if (entry[1] !== "whatever" && entry[1] !== "") {
          if (entry[1] === "false") params = { ...params, delivery: false };
          else params = { ...params, delivery: true };
        }
        break;
      case "trade":
        if (entry[1] !== "whatever" && entry[1] !== "") {
          if (entry[1] === "false") params = { ...params, trade: false };
          else params = { ...params, trade: true };
        }
        break;
      default:
        break;
    }
  }
  return (
    <div>
      {/* <div className=" text-text-white text-3xl pb-6">Listings found:</div> */}
      <SectionTitle title="Listings found" />
      <ListingsViewer itemsPerPage={42} query={params} />
    </div>
  );
}
