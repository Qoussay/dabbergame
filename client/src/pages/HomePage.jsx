import Hero from "../components/Hero";
import ListingsViewer from "../components/ListingsViewer";
import SortAndFilter from "../components/SortAndFilter";
export default function HomePage() {
  return (
    <div className="pt-14">
      <Hero />
      <hr></hr>
      <div className="py-6">
        {/* <SortAndFilter /> */}
        <ListingsViewer itemsPerPage={42} />
      </div>
    </div>
  );
}
