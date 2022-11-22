import SortAndFilter from "../components/SortAndFilter";
import ListingsViewer from "../components/ListingsViewer";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
export default function ListingsPage() {
  const [searchparams] = useSearchParams();
  useEffect(() => {
    console.log(searchparams.toString());
  }, [searchparams]);

  return (
    <div>
      <SortAndFilter />
      <ListingsViewer itemsPerPage={42} />
    </div>
  );
}
