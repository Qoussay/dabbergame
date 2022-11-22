import SortAndFilter from "../components/SortAndFilter";
import ListingsViewer from "../components/ListingsViewer";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export default function ListingsPage() {
  const [searchparams] = useSearchParams();
  console.log(searchparams.get("gameName"));

  return (
    <div>
      <div className=" text-text-white text-3xl pb-6">
        Listings for: {searchparams.get("gameName")}
      </div>
      <SortAndFilter />
      <ListingsViewer
        itemsPerPage={42}
        query={{ gameName: searchparams.get("gameName") }}
      />
    </div>
  );
}
